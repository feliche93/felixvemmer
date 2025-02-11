import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createUrl } from '@/lib/utils'
import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  totalPages: number
  page: number
  pageSize: number
}

export function DataTablePagination<TData>({
  table,
  totalPages,
  page,
  pageSize,
}: DataTablePaginationProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()

  table.setPageIndex(page - 1)
  table.setPageSize(pageSize)

  const newSearchPrams = new URLSearchParams({
    page: page.toString(),
    totalPages: totalPages.toString(),
    pageSize: pageSize.toString(),
  })

  if (!table.getState().pagination) {
    return null
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-sm">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              newSearchPrams.set('pageSize', value)
              router.push(createUrl(pathname, newSearchPrams))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center font-medium text-sm">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              newSearchPrams.set('page', '1')
              router.push(createUrl(pathname, newSearchPrams))
            }}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const previousPage = page - 1
              newSearchPrams.set('page', previousPage.toString())
              router.push(createUrl(pathname, newSearchPrams))
            }}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const nextPage = page + 1
              newSearchPrams.set('page', nextPage.toString())
              router.push(createUrl(pathname, newSearchPrams))
            }}
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              const lastPage = totalPages
              newSearchPrams.set('page', lastPage.toString())
              router.push(createUrl(pathname, newSearchPrams))
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
