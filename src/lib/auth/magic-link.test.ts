import { afterAll, beforeAll, beforeEach, describe, expect, mock, test } from "bun:test"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { PGlite } from "@electric-sql/pglite"
import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/pglite"
import { users } from "@/drizzle/schema/auth/schema"

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

async function startGoogleSignIn(additionalData: Record<string, unknown>) {
  const response = await request("/sign-in/social", {
    method: "POST",
    body: JSON.stringify({ provider: "google", callbackURL: "/", additionalData }),
  })
  expect(response.status).toBe(200)
  const { url } = (await response.json()) as { url: string }
  const state = new URL(url).searchParams.get("state")
  expect(state).toBeTruthy()
  return state as string
}

async function countRows(table: "sessions" | "users") {
  const result = await db.execute<{ count: number }>(
    sql.raw(`select count(*)::int as count from ${table}`),
  )
  return result.rows[0]?.count ?? 0
}

function sessionCookie(response: Response) {
  return response.headers.getSetCookie().find((cookie) => cookie.includes("session_token="))
}

// Applies the auth migrations in order, as `drizzle-kit migrate` does in the Docker build. 0011
// created the auth tables; the migrations before it belong to dropped tables and need seed data.
const FIRST_AUTH_MIGRATION = "0011"

beforeAll(async () => {
  ;({ auth } = await import("./index"))

  const folder = path.resolve(import.meta.dir, "../../../drizzle/migration")
  const files = (await readdir(folder))
    .filter((file) => file.endsWith(".sql") && file >= FIRST_AUTH_MIGRATION)
    .sort()
  for (const file of files) {
    await client.exec(await readFile(path.join(folder, file), "utf8"))
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
    await db.insert(users).values({
      id: "user_victim",
      email: VICTIM_EMAIL,
      name: "Victim",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const state = await startGoogleSignIn({ email: VICTIM_EMAIL, name: "Victim" })
    const response = await request(
      `/magic-link/verify?token=${encodeURIComponent(state)}&callbackURL=/`,
    )

    expect(response.status).toBe(302)
    expect(
      new URL(response.headers.get("location") ?? "", BASE_URL).searchParams.get("error"),
    ).toBe("INVALID_TOKEN")
    expect(sessionCookie(response)).toBeUndefined()
    expect(await countRows("sessions")).toBe(0)
  })

  test("rejects a Google sign-in state as a token for a new email", async () => {
    const state = await startGoogleSignIn({ email: "new@example.com", name: "New" })
    const response = await request(`/magic-link/verify?token=${encodeURIComponent(state)}`)

    expect(response.status).not.toBe(200)
    expect(sessionCookie(response)).toBeUndefined()
    expect(await countRows("users")).toBe(0)
    expect(await countRows("sessions")).toBe(0)
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
    expect(await countRows("users")).toBe(1)
    expect(await countRows("sessions")).toBe(1)

    // A link works once.
    const replay = await request(
      `${verifyUrl.pathname.replace("/api/auth", "")}${verifyUrl.search}`,
    )
    expect(new URL(replay.headers.get("location") ?? "", BASE_URL).searchParams.get("error")).toBe(
      "INVALID_TOKEN",
    )
  })
})
