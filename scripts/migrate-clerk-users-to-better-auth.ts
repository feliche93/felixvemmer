import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
import { eq } from "drizzle-orm"
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http"
import { users } from "../drizzle/schema/auth/schema"
import { newId } from "../src/lib/auth/ids"

dotenv.config({ path: ".env.local" })

type ClerkEmailAddress = {
  id: string
  email_address: string
  verification?: {
    status?: string
  }
}

type ClerkUser = {
  id: string
  first_name: string | null
  last_name: string | null
  image_url: string | null
  created_at: number | null
  updated_at: number | null
  primary_email_address_id: string | null
  email_addresses: ClerkEmailAddress[]
}

type MappingRecord = {
  clerkId: string
  userId: string | null
  email: string | null
  action: "inserted" | "updated_clerk_match" | "updated_email_match" | "skipped_no_email"
}

interface CliOptions {
  dryRun: boolean
  limit?: number
  cursor: number
  writeMapping: boolean
  mappingPath: string
}

function parseArgs(argv: string[]): CliOptions {
  const opts: CliOptions = {
    dryRun: false,
    cursor: 0,
    writeMapping: false,
    mappingPath: path.resolve(process.cwd(), "scripts/clerk-user-id-mapping.json"),
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg) continue

    if (arg === "--dry-run") {
      opts.dryRun = true
      continue
    }

    if (arg.startsWith("--limit=")) {
      opts.limit = Number.parseInt(arg.split("=")[1] || "", 10)
      continue
    }

    if (arg === "--limit") {
      opts.limit = Number.parseInt(argv[i + 1] || "", 10)
      i += 1
      continue
    }

    if (arg.startsWith("--cursor=")) {
      opts.cursor = Number.parseInt(arg.split("=")[1] || "", 10)
      continue
    }

    if (arg === "--cursor") {
      opts.cursor = Number.parseInt(argv[i + 1] || "", 10)
      i += 1
      continue
    }

    if (arg === "--write-mapping") {
      const next = argv[i + 1]
      if (next && !next.startsWith("--")) {
        opts.mappingPath = path.resolve(process.cwd(), next)
        i += 1
      }
      opts.writeMapping = true
    }
  }

  if (Number.isNaN(opts.cursor) || opts.cursor < 0) {
    throw new Error("Invalid --cursor value. It must be a non-negative number.")
  }

  if (opts.limit !== undefined && (Number.isNaN(opts.limit) || opts.limit <= 0)) {
    throw new Error("Invalid --limit value. It must be a positive number.")
  }

  return opts
}

function getPrimaryEmail(user: ClerkUser): ClerkEmailAddress | null {
  if (!user.email_addresses?.length) return null
  const primary = user.email_addresses.find((item) => item.id === user.primary_email_address_id)
  return primary || user.email_addresses[0] || null
}

function normalizeName(user: ClerkUser, email: string): string {
  const first = user.first_name?.trim()
  const last = user.last_name?.trim()

  if (first && last) return `${first} ${last}`
  if (first) return first
  if (last) return last

  const localPart = email.split("@")[0]
  return localPart || "User"
}

async function fetchClerkUsers({
  offset,
  limit,
  clerkSecretKey,
}: {
  offset: number
  limit: number
  clerkSecretKey: string
}): Promise<ClerkUser[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  })
  const response = await fetch(`https://api.clerk.com/v1/users?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${clerkSecretKey}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Clerk API error (${response.status}): ${text}`)
  }

  const payload = (await response.json()) as ClerkUser[]
  return payload
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const clerkSecretKey = process.env.CLERK_SECRET_KEY
  const databaseUrl = process.env.DATABASE_URL

  if (!clerkSecretKey) throw new Error("CLERK_SECRET_KEY is required.")
  if (!databaseUrl) throw new Error("DATABASE_URL is required.")

  const db = drizzleHttp(neon(databaseUrl))
  const batchSize = 100
  let offset = options.cursor
  let importedCount = 0
  const mapping: MappingRecord[] = []

  while (true) {
    const remaining = options.limit ? options.limit - importedCount : batchSize
    if (remaining <= 0) break

    const currentBatchSize = Math.min(batchSize, remaining)
    const clerkUsers = await fetchClerkUsers({
      offset,
      limit: currentBatchSize,
      clerkSecretKey,
    })

    if (clerkUsers.length === 0) break

    for (const clerkUser of clerkUsers) {
      if (options.limit && importedCount >= options.limit) break

      const primaryEmail = getPrimaryEmail(clerkUser)
      const email = primaryEmail?.email_address?.toLowerCase() || null
      if (!email) {
        mapping.push({
          clerkId: clerkUser.id,
          userId: null,
          email: null,
          action: "skipped_no_email",
        })
        continue
      }

      const verified = primaryEmail?.verification?.status === "verified"
      const name = normalizeName(clerkUser, email)
      const now = new Date()
      const createdAt = clerkUser.created_at ? new Date(clerkUser.created_at) : now
      const updatedAt = clerkUser.updated_at ? new Date(clerkUser.updated_at) : now

      const [existingByClerk] = await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.clerkExternalId, clerkUser.id))
        .limit(1)

      if (existingByClerk) {
        if (!options.dryRun) {
          await db
            .update(users)
            .set({
              name,
              email,
              emailVerified: verified,
              image: clerkUser.image_url,
              updatedAt,
            })
            .where(eq(users.id, existingByClerk.id))
        }

        mapping.push({
          clerkId: clerkUser.id,
          userId: existingByClerk.id,
          email,
          action: "updated_clerk_match",
        })
        importedCount += 1
        continue
      }

      const [existingByEmail] = await db
        .select({
          id: users.id,
          clerkExternalId: users.clerkExternalId,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

      if (existingByEmail) {
        if (existingByEmail.clerkExternalId && existingByEmail.clerkExternalId !== clerkUser.id) {
          mapping.push({
            clerkId: clerkUser.id,
            userId: existingByEmail.id,
            email,
            action: "updated_email_match",
          })
          importedCount += 1
          continue
        }

        if (!options.dryRun) {
          await db
            .update(users)
            .set({
              name,
              emailVerified: verified,
              image: clerkUser.image_url,
              clerkExternalId: clerkUser.id,
              updatedAt,
            })
            .where(eq(users.id, existingByEmail.id))
        }

        mapping.push({
          clerkId: clerkUser.id,
          userId: existingByEmail.id,
          email,
          action: "updated_email_match",
        })
        importedCount += 1
        continue
      }

      const newUserId = newId("user")
      if (!options.dryRun) {
        await db.insert(users).values({
          id: newUserId,
          name,
          email,
          emailVerified: verified,
          image: clerkUser.image_url,
          clerkExternalId: clerkUser.id,
          createdAt,
          updatedAt,
        })
      }

      mapping.push({
        clerkId: clerkUser.id,
        userId: newUserId,
        email,
        action: "inserted",
      })
      importedCount += 1
    }

    offset += clerkUsers.length
    if (clerkUsers.length < currentBatchSize) break
  }

  if (options.writeMapping) {
    await fs.writeFile(options.mappingPath, JSON.stringify(mapping, null, 2), "utf-8")
  }

  const summary = mapping.reduce<Record<MappingRecord["action"], number>>(
    (acc, item) => {
      acc[item.action] += 1
      return acc
    },
    {
      inserted: 0,
      updated_clerk_match: 0,
      updated_email_match: 0,
      skipped_no_email: 0,
    },
  )

  console.log(
    JSON.stringify(
      {
        dryRun: options.dryRun,
        cursorStart: options.cursor,
        importedCount,
        summary,
        mappingPath: options.writeMapping ? options.mappingPath : null,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
