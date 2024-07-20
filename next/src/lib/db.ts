import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'

import * as schema from '@/../drizzle/schema'
import { env } from '@/server'

const pool = new Pool({ connectionString: env.DATABASE_URL })

export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})
