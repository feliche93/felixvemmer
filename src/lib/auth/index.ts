import { passkey } from "@better-auth/passkey"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { magicLink } from "better-auth/plugins"
import { Resend } from "resend"
import * as schema from "@/drizzle/schema/auth/schema"
import { env } from "@/server"
import { db } from "../db"
import { generateAuthModelId } from "./ids"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const baseUrlHostname = (() => {
  try {
    return new URL(baseURL).hostname
  } catch {
    return "localhost"
  }
})()

const resend = new Resend(env.RESEND_API_KEY)

export const auth = betterAuth({
  appName: "Felix Vemmer",
  baseURL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [baseURL],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  advanced: {
    database: {
      generateId: ({ model }) => generateAuthModelId(model),
    },
  },
  user: {
    additionalFields: {
      clerkExternalId: {
        type: "string",
        required: false,
        unique: true,
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const result = await resend.emails.send({
          from: "Felix Vemmer <onboarding@resend.dev>",
          to: email,
          subject: "Your sign-in link",
          text: `Use this secure link to continue: ${url}`,
          html: `<p>Use this secure link to continue:</p><p><a href="${url}">${url}</a></p>`,
        })

        if (result.error) {
          throw new Error(`Failed to send magic link: ${result.error.message}`)
        }
      },
    }),
    passkey({
      rpID: baseUrlHostname,
      origin: baseURL,
    }),
    nextCookies(),
  ],
})

export type TAuth = typeof auth
