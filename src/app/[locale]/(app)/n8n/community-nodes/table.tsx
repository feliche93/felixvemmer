'use client'

import { DataTable } from '@/components/data-table/data-table'
import { SearchFilter } from '@/components/data-table/data-table-search-filter'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { DataTableToolbarFilters } from '@/components/data-table/data-table-toolbar-filters'
import type { TGetCommunityNodes } from '@/data/community-nodes'
import { useDataTable } from '@/hooks/use-data-table'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { type TRow, fetchNodesTableColumnDef } from './table-column-defs'

interface TableProps {
  promise: Promise<TGetCommunityNodes>
  children?: React.ReactNode
}

export function Table({ promise, children }: TableProps) {
  const response = React.use(promise)
  const { pageCount } = response

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<TRow, keyof TRow>[]>(() => fetchNodesTableColumnDef(), [])

  const data: TRow[] = response.data.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    license: row.license,
    homepageUrl: row.homepageUrl,
    repositoryUrl: row.repositoryUrl,
    bugsUrl: row.bugsUrl,
    npmUrl: row.npmUrl,
    dependents: row.dependents,
    isInsecure: row.isInsecure,
    publisherName: row.publisherName,
    publisherEmail: row.publisherEmail,
    popularity: Number(row.popularity),
    quality: Number(row.quality),
    maintenance: Number(row.maintenance),
    finalScore: Number(row.finalScore),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }))

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableToolbarFilters>
          <SearchFilter<TRow> placeholder="Search nodes" searchParamName="name" />
          {/* <MinMaxFilter<TCampaign>
            placeholder="DR"
            table={table}
            columnNames={['backlinkProspectCount']}
          /> */}
        </DataTableToolbarFilters>
        {/* <DataTableToolbarActions>
          <CreateCampaignUrlForm />
        </DataTableToolbarActions> */}
      </DataTableToolbar>
    </DataTable>
  )
}
