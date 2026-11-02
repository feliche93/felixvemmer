import { afterAll, beforeAll, beforeEach, describe, expect, mock, test } from "bun:test"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { PGlite } from "@electric-sql/pglite"
import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/pglite"
import { exportJWK, generateKeyPair, SignJWT } from "jose"
import { accounts, sessions, users, verifications } from "@/drizzle/schema/auth/schema"

// Runs the real `auth` config (src/lib/auth/index.ts) against an in-memory Postgres with the
// repo's Drizzle migrations applied. Better Auth 1.7.3+ checks the schema at init and rejects
// every auth request on a mismatch, so these tests also catch schema drift.

const BASE_URL = "http://localhost:3000"

Object.assign(process.env, {
  NEXT_PUBLIC_BASE_URL: BASE_URL,
  BETTER_AUTH_SECRET: "test-secret-test-secret-test-secret-123456",
  DATABASE_URL: "postgres://test:test@localhost:5432/test",
  DIRECT_URL: "postgres://test:test@localhost:5432/test",
  GOOGLE_CLIENT_ID: "test-google-client-id",
  GOOGLE_CLIENT_SECRET: "test-google-client-secret",
  GITHUB_TOKEN: "test",
  LEMON_SQUEEZY_BACKLINKGPT_API_KEY: "test",
  PAPIERKRAM_API_URL: "https://example.com",
  PAPIERKRAM_TOKEN: "test",
  POSTHOG_PERSONAL_API_KEY: "test",
  POSTHOG_PROJECT_ID: "test",
  RESEND_API_KEY: "re_test",
  SCRAPING_ROBOT_API_KEY: "test",
  TRIGGER_API_KEY: "test",
})

const client = new PGlite()
const db = drizzle(client)

mock.module("@/lib/db", () => ({ db }))

const sentEmails: { to: string; text: string }[] = []
mock.module("resend", () => ({
  Resend: class {
    emails = {
      send: async (email: { to: string; text: string }) => {
        sentEmails.push(email)
        return { data: { id: "test" }, error: null }
      },
    }
  },
}))

let auth: typeof import("./index").auth

const VICTIM_EMAIL = "victim@example.com"

async function request(pathname: string, init?: RequestInit) {
  return auth.handler(
    new Request(`${BASE_URL}/api/auth${pathname}`, {
      ...init,
      headers: { origin: BASE_URL, "content-type": "application/json", ...init?.headers },
    }),
  )
}

async function startGoogleSignIn(additionalData?: Record<string, unknown>) {
  const response = await request("/sign-in/social", {
    method: "POST",
    body: JSON.stringify({ provider: "google", callbackURL: "/", additionalData }),
  })
  expect(response.status).toBe(200)
  const { url } = (await response.json()) as { url: string }
  const state = new URL(url).searchParams.get("state")
  expect(state).toBeTruthy()
  const cookies = response.headers
    .getSetCookie()
    .map((cookie) => cookie.split(";")[0])
    .join("; ")
  return { state: state as string, cookies }
}

async function insertUser(email: string, emailVerified: boolean) {
  await db.insert(users).values({
    id: `user_${email.split("@")[0]}`,
    email,
    name: email.split("@")[0] ?? email,
    emailVerified,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

function sessionCookie(response: Response) {
  return response.headers.getSetCookie().find((cookie) => cookie.includes("session_token="))
}

// Applies the auth migrations in journal order, as `drizzle-kit migrate` does in the Docker build.
// 0011 created the auth tables; the migrations before it belong to dropped tables and need seed data.
const FIRST_AUTH_MIGRATION = 11

beforeAll(async () => {
  ;({ auth } = await import("./index"))

  const folder = path.resolve(import.meta.dir, "../../../drizzle/migration")
  const journal = JSON.parse(await readFile(path.join(folder, "meta/_journal.json"), "utf8")) as {
    entries: { idx: number; tag: string }[]
  }
  for (const { idx, tag } of journal.entries) {
    if (idx < FIRST_AUTH_MIGRATION) continue
    await client.exec(await readFile(path.join(folder, `${tag}.sql`), "utf8"))
  }
})

afterAll(async () => {
  await client.close()
})

beforeEach(async () => {
  sentEmails.length = 0
  await db.execute(sql`truncate users, sessions, accounts, verifications, passkeys cascade`)
})

describe("magic link", () => {
  // GHSA-965c-763c-88jm: before 1.7.7, /magic-link/verify accepted a social sign-in `state` as a
  // Magic Link token, so anyone could sign in as any email.
  test("rejects a Google sign-in state as a token for an existing user", async () => {
    await insertUser(VICTIM_EMAIL, true)

    const { state } = await startGoogleSignIn({ email: VICTIM_EMAIL, name: "Victim" })
    // The attack needs the state to be a database row, which it is with the default strategy.
    expect(await db.$count(verifications)).toBe(1)
    const response = await request(
      `/magic-link/verify?token=${encodeURIComponent(state)}&callbackURL=/`,
    )

    expect(response.status).toBe(302)
    expect(
      new URL(response.headers.get("location") ?? "", BASE_URL).searchParams.get("error"),
    ).toBe("INVALID_TOKEN")
    expect(sessionCookie(response)).toBeUndefined()
    expect(await db.$count(sessions)).toBe(0)
  })

  test("rejects a Google sign-in state as a token for a new email", async () => {
    const { state } = await startGoogleSignIn({ email: "new@example.com", name: "New" })
    expect(await db.$count(verifications)).toBe(1)
    const response = await request(`/magic-link/verify?token=${encodeURIComponent(state)}`)

    expect(response.status).toBe(302)
    expect(
      new URL(response.headers.get("location") ?? "", BASE_URL).searchParams.get("error"),
    ).toBe("INVALID_TOKEN")
    expect(sessionCookie(response)).toBeUndefined()
    expect(await db.$count(users)).toBe(0)
    expect(await db.$count(sessions)).toBe(0)
  })

  test("signs in with a real magic link", async () => {
    const response = await request("/sign-in/magic-link", {
      method: "POST",
      body: JSON.stringify({ email: VICTIM_EMAIL, callbackURL: "/" }),
    })
    expect(response.status).toBe(200)
    expect(sentEmails).toHaveLength(1)

    const link = sentEmails[0]?.text.match(/https?:\/\/\S+/)?.[0]
    expect(link).toBeTruthy()
    const verifyUrl = new URL(link as string)
    const verify = await request(
      `${verifyUrl.pathname.replace("/api/auth", "")}${verifyUrl.search}`,
    )

    expect(verify.status).toBe(302)
    expect(verify.headers.get("location")).toBe(`${BASE_URL}/`)
    expect(sessionCookie(verify)).toBeTruthy()
    expect(await db.$count(users)).toBe(1)
    expect(await db.$count(sessions)).toBe(1)

    // A link works once.
    const replay = await request(
      `${verifyUrl.pathname.replace("/api/auth", "")}${verifyUrl.search}`,
    )
    expect(new URL(replay.headers.get("location") ?? "", BASE_URL).searchParams.get("error")).toBe(
      "INVALID_TOKEN",
    )
  })
})

describe("Google sign-in", () => {
  const originalFetch = globalThis.fetch
  let signingKey: CryptoKey
  let googleSubject: string
  let googleEmail: string

  beforeAll(async () => {
    const keys = await generateKeyPair("RS256")
    signingKey = keys.privateKey
    const jwk = { ...(await exportJWK(keys.publicKey)), kid: "test-key", alg: "RS256", use: "sig" }

    // Stands in for Google's token endpoint and signing keys.
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(input instanceof Request ? input.url : input.toString())
      if (url.href === "https://www.googleapis.com/oauth2/v3/certs") {
        return Response.json({ keys: [jwk] })
      }
      if (url.href === "https://oauth2.googleapis.com/token") {
        const idToken = await new SignJWT({
          email: googleEmail,
          email_verified: true,
          name: "Google User",
        })
          .setProtectedHeader({ alg: "RS256", kid: "test-key" })
          .setIssuer("https://accounts.google.com")
          .setAudience(process.env.GOOGLE_CLIENT_ID as string)
          .setSubject(googleSubject)
          .setIssuedAt()
          .setExpirationTime("5m")
          .sign(signingKey)
        return Response.json({
          access_token: "google-access-token",
          id_token: idToken,
          expires_in: 3600,
          token_type: "Bearer",
          scope: "openid email profile",
        })
      }
      return originalFetch(input, init)
    }) as typeof fetch
  })

  afterAll(() => {
    globalThis.fetch = originalFetch
  })

  async function signInWithGoogle(email: string, subject: string) {
    googleEmail = email
    googleSubject = subject
    const { state, cookies } = await startGoogleSignIn()
    return request(`/callback/google?code=test-code&state=${encodeURIComponent(state)}`, {
      headers: { cookie: cookies },
    })
  }

  test("creates a user and a Google account on first sign-in", async () => {
    const response = await signInWithGoogle("new@example.com", "google-sub-new")

    expect(response.status).toBe(302)
    expect(response.headers.get("location")).toBe("/")
    expect(sessionCookie(response)).toBeTruthy()
    const [account] = await db.select().from(accounts)
    expect(account?.providerId).toBe("google")
    expect(account?.accountId).toBe("google-sub-new")
    expect(account?.id).toStartWith("acct_")
    expect(account?.userId).toStartWith("user_")
  })

  test("links Google to an existing verified user", async () => {
    await insertUser(VICTIM_EMAIL, true)

    const response = await signInWithGoogle(VICTIM_EMAIL, "google-sub-victim")

    expect(response.headers.get("location")).toBe("/")
    expect(sessionCookie(response)).toBeTruthy()
    expect(await db.$count(users)).toBe(1)
    const [account] = await db.select().from(accounts)
    expect(account?.userId).toBe("user_victim")
  })

  // Since 1.7, `accountLinking.requireLocalEmailVerified` defaults to true.
  test("does not link Google to an existing unverified user", async () => {
    await insertUser(VICTIM_EMAIL, false)

    const response = await signInWithGoogle(VICTIM_EMAIL, "google-sub-victim")

    expect(
      new URL(response.headers.get("location") ?? "", BASE_URL).searchParams.get("error"),
    ).toBe("account_not_linked")
    expect(sessionCookie(response)).toBeUndefined()
    expect(await db.$count(accounts)).toBe(0)
  })
})
