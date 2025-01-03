import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    GITHUB_TOKEN: z.string().min(1),
    LEMON_SQUEEZY_BACKLINKGPT_API_KEY: z.string().min(1),
    PAPIERKRAM_API_URL: z.string().url(),
    PAPIERKRAM_TOKEN: z.string().min(1),
    POSTHOG_PERSONAL_API_KEY: z.string().min(1),
    POSTHOG_PROJECT_ID: z.string().min(1),
    SCRAPING_ROBOT_API_KEY: z.string().min(1),
    TRIGGER_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    LEMON_SQUEEZY_BACKLINKGPT_API_KEY: process.env.LEMON_SQUEEZY_BACKLINKGPT_API_KEY,
    PAPIERKRAM_API_URL: process.env.PAPIERKRAM_API_URL,
    PAPIERKRAM_TOKEN: process.env.PAPIERKRAM_TOKEN,
    POSTHOG_PERSONAL_API_KEY: process.env.POSTHOG_PERSONAL_API_KEY,
    POSTHOG_PROJECT_ID: process.env.POSTHOG_PROJECT_ID,
    SCRAPING_ROBOT_API_KEY: process.env.SCRAPING_ROBOT_API_KEY,
    TRIGGER_API_KEY: process.env.TRIGGER_API_KEY,
  },
})
