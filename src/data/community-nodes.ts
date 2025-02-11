import { npmPackages } from '@/drizzle/schema'
import { db, withTableFeatures } from '@/lib/db'
import { and, sql } from 'drizzle-orm'

export async function getCommunityNodes({
  page,
  perPage,
  sortCol,
  sortDir,
  name,
}: {
  page: number
  perPage: number
  sortCol: string
  sortDir: 'asc' | 'desc' | null
  name?: string
}) {
  const query = db
    .select()
    .from(npmPackages)
    .where(and(name ? sql`${npmPackages.name} ILIKE ${`%${name}%`}` : undefined))

  const result = withTableFeatures(db, query.$dynamic(), {
    page,
    perPage,
    order: sortDir,
    orderBy: sortCol,
    sortMap: {
      default: npmPackages.createdAt,
      name: npmPackages.name,
      description: npmPackages.description,
      publisherName: npmPackages.publisherName,
      createdAt: npmPackages.createdAt,
      updatedAt: npmPackages.updatedAt,
    },
  })

  return result
}

export type TGetCommunityNodes = Awaited<ReturnType<typeof getCommunityNodes>>
