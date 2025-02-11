import { env } from '@/server'
import { Client, Pool, neon } from '@neondatabase/serverless'
import { type SQL, asc, count, desc } from 'drizzle-orm'
import { type NeonHttpDatabase, drizzle as drizzleHttp } from 'drizzle-orm/neon-http'
import { drizzle as drizzleWebsocket } from 'drizzle-orm/neon-serverless'
import type { PgColumn, PgSelect } from 'drizzle-orm/pg-core'

const pool = new Pool({ connectionString: env.DATABASE_URL })

// export const db = drizzle(pool, {
//   schema: {
//     ...schema,
//   },
// })

export const db = createHttpDbClient({
  connectionString: env.DATABASE_URL,
})

export function createHttpDbClient({
  connectionString,
  logger = false,
}: {
  connectionString: string
  logger?: boolean
}) {
  return drizzleHttp(neon(connectionString), {
    logger,
  })
}

export function createWebSocketDbClient({
  connectionString,
  logger = false,
}: {
  connectionString: string
  logger?: boolean
}) {
  const client = new Client({
    connectionString,
  })

  const db = drizzleWebsocket(client, {
    logger,
  })

  return {
    db,
    client,
  }
}

export const getFirstOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1) throw new Error('Found non unique or inexistent value')
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return values[0]!
}
export async function withPagination<T extends PgSelect>(
  db: NeonHttpDatabase<Record<string, never>>,
  qb: T,
  page: number,
  perPage = 10,
) {
  const offset = (page - 1) * perPage

  // First, create a subquery for counting
  const countSubQuery = qb.as('count_subquery')

  // Run count query and data query in parallel
  const [totalRowsResult, data] = await db.batch([
    db
      .select({
        value: count(),
      })
      // TODO: Fix this
      // @ts-expect-error
      .from(countSubQuery),
    qb.limit(perPage).offset(offset),
  ])

  // console.log(qb.toSQL())

  const totalRows = totalRowsResult[0]?.value || 0
  const pageCount = Math.ceil(totalRows / perPage) - 1

  return {
    data,
    pageCount,
    totalRows,
  }
}

export function withOrderBy<T extends PgSelect>(
  qb: T,
  {
    order = 'asc',
    orderBy,
    sortMap,
    nullsLast = true,
  }: {
    order?: 'asc' | 'desc'
    orderBy?: string
    sortMap: Record<string, PgColumn | SQL | SQL.Aliased> & Record<'default', PgColumn | SQL>
    nullsLast?: boolean
  },
) {
  const sortOrder = order === 'asc' ? asc : desc
  const orderBySql = orderBy ? sortMap[orderBy] || sortMap.default : sortMap.default

  return qb.orderBy(sortOrder(orderBySql))
}

export function withTableFeatures<T extends PgSelect>(
  db: NeonHttpDatabase<Record<string, never>>,
  qb: T,
  {
    page,
    perPage,
    order,
    sortMap,
    orderBy,
    nullsLast,
  }: {
    page: number
    perPage: number
    order?: 'asc' | 'desc' | null
    orderBy?: string | null
    sortMap: Record<string, PgColumn | SQL | SQL.Aliased> & Record<'default', PgColumn | SQL>
    nullsLast?: boolean
  },
) {
  if (orderBy && order) {
    const orderedQuery = withOrderBy(qb, {
      order,
      sortMap,
      orderBy,
      nullsLast,
    })

    return withPagination(db, orderedQuery, page, perPage)
  }

  return withPagination(db, qb, page, perPage)
}
