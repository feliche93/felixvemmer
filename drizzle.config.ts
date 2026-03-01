import { defineConfig } from "drizzle-kit"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    "DATABASE_URL environment variable not set. Run drizzle commands via scripts/with-infisical.sh.",
  )
}

export default defineConfig({
  schema: "./drizzle/schema",
  out: "./drizzle/migration",
  dbCredentials: {
    url: connectionString,
  },
  dialect: "postgresql",
  casing: "snake_case",
})
