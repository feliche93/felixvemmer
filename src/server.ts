import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    DATABASE_URL: z.url(),
    DIRECT_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_TOKEN: z.string().min(1),
    LEMON_SQUEEZY_BACKLINKGPT_API_KEY: z.string().min(1),
    PAPIERKRAM_API_URL: z.url(),
    PAPIERKRAM_TOKEN: z.string().min(1),
    POSTHOG_PERSONAL_API_KEY: z.string().min(1),
    POSTHOG_PROJECT_ID: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    SCRAPING_ROBOT_API_KEY: z.string().min(1),
    TRIGGER_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    LEMON_SQUEEZY_BACKLINKGPT_API_KEY: process.env.LEMON_SQUEEZY_BACKLINKGPT_API_KEY,
    PAPIERKRAM_API_URL: process.env.PAPIERKRAM_API_URL,
    PAPIERKRAM_TOKEN: process.env.PAPIERKRAM_TOKEN,
    POSTHOG_PERSONAL_API_KEY: process.env.POSTHOG_PERSONAL_API_KEY,
    POSTHOG_PROJECT_ID: process.env.POSTHOG_PROJECT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SCRAPING_ROBOT_API_KEY: process.env.SCRAPING_ROBOT_API_KEY,
    TRIGGER_API_KEY: process.env.TRIGGER_API_KEY,
  },
})
