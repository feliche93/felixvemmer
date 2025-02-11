import { nodeSubcategories, npmPackageNodeSubcategory, npmPackages } from '@/drizzle/schema'
import { db, withTableFeatures } from '@/lib/db'
import { and, eq, getTableColumns, sql } from 'drizzle-orm'

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
  const npmPackagesColumns = getTableColumns(npmPackages)

  const query = db
    .select({
      ...npmPackagesColumns,
      nodeSubcategory: nodeSubcategories.name,
    })
    .from(npmPackages)
    .where(and(name ? sql`LOWER(${npmPackages.name}) LIKE LOWER(${`%${name}%`})` : undefined))
    .leftJoin(npmPackageNodeSubcategory, eq(npmPackages.id, npmPackageNodeSubcategory.npmPackageId))
    .leftJoin(
      nodeSubcategories,
      eq(npmPackageNodeSubcategory.nodeSubcategoryId, nodeSubcategories.id),
    )

  const result = await withTableFeatures(db, query.$dynamic(), {
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
