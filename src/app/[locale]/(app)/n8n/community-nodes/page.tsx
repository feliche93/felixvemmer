import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getCommunityNodes } from '@/data/community-nodes'
import { tableSearchParamsCache } from '@/search-params/table'
import type { TSearchParams } from '@/types/search-params'
import { Suspense } from 'react'
import { Table } from './table'

export default async function N8nCommunityNodesPage(props: {
  searchParams: TSearchParams
}) {
  const tableQuery = await tableSearchParamsCache.parse(props.searchParams)
  const searchParams = await props.searchParams

  const promise = getCommunityNodes({
    page: tableQuery.page,
    perPage: tableQuery.perPage,
    sortCol: tableQuery.sortCol ?? 'default',
    sortDir: tableQuery.sortDir,
    name: typeof searchParams.name === 'string' ? searchParams.name : undefined,
  })

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Community Nodes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>All Nodes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-2">
        <Suspense
          key={JSON.stringify(tableQuery)}
          fallback={
            <DataTableSkeleton
              columnCount={6}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }
        >
          <Table promise={promise} />
        </Suspense>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div> */}
      </div>
    </>
  )
}
