import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { env } from '@/server'
import * as schema from '@/drizzle/schema/core'

const pool = new Pool({ connectionString: env.DATABASE_URL })

export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})
