'use client'

import {
  type FilterFn,
  type TableOptions,
  type TableState,
  filterFns,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type * as React from 'react'
import { z } from 'zod'

import { fuzzyFilter } from '@/components/ui/filter-functions'
import { usePage, usePerPage } from '@/hooks/use-table-pagination'
import type { DataTableFilterField } from '@/types'
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
      | 'filterFns'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  /**
   * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
   * - Faceted filters are rendered when `options` are provided for a filter field.
   * - Otherwise, search filters are rendered.
   *
   * The indie filter field `value` represents the corresponding column name in the database table.
   * @default []
   * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
   * @example
   * ```ts
   * // Render a search filter
   * const filterFields = [
   *   { label: "Title", value: "title", placeholder: "Search titles" }
   * ];
   * // Render a faceted filter
   * const filterFields = [
   *   {
   *     label: "Status",
   *     value: "status",
   *     options: [
   *       { label: "Todo", value: "todo" },
   *       { label: "In Progress", value: "in-progress" },
   *     ]
   *   }
   * ];
   * ```
   */
  filterFields?: DataTableFilterField<TData>[]

  /**
   * Enable notion like column filters.
   * Advanced filters and column filters cannot be used at the same time.
   * @default false
   * @type boolean
   */
  enableAdvancedFilter?: boolean

  /**
   * The method to use when updating the URL.
   * - "push" - Pushes a new entry onto the history stack.
   * - "replace" - Replaces the current entry on the history stack.
   * @default "replace"
   */
  method?: 'push' | 'replace'

  /**
   * Indicates whether the page should scroll to the top when the URL changes.
   * @default false
   */
  scroll?: boolean

  /**
   * A callback function that is called before updating the URL.
   * Can be use to retrieve the loading state of the route transition.
   * @see https://react.dev/reference/react/useTransition
   *
   */
  startTransition?: React.TransitionStartFunction

  // Extend to make the sorting id typesafe
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: {
      id: Extract<keyof TData, string>
      desc: boolean
    }[]
  }
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
})

export function useDataTable<TData>({
  pageCount = -1,
  filterFields = [],
  enableAdvancedFilter = false,
  method = 'replace',
  scroll = false,
  startTransition,
  ...props
}: UseDataTableProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sortOrder = ['asc', 'desc'] as const

  const [sortDir, setSortDir] = useQueryState(
    'sortDir',
    parseAsStringLiteral(sortOrder).withOptions({
      shallow: false,
      clearOnDefault: true,
      scroll: false,
    }),
  )

  const [sortCol, setSortCol] = useQueryState(
    'sortCol',
    parseAsString.withOptions({
      shallow: false,
      clearOnDefault: true,
      scroll: false,
    }),
  )

  const [page, setPage] = usePage()
  const [perPage, setPerPage] = usePerPage()

  // const [rowSelection, setRowSelection] = React.useState({})
  // const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>()

  const table = useReactTable({
    ...props,
    pageCount,
    initialState: {
      pagination: {
        pageIndex: page - 1,
        pageSize: perPage,
      },
      sorting: [
        ...(sortCol
          ? [
              {
                id: sortCol,
                desc: sortDir === 'desc',
              },
            ]
          : []),
      ],
    },
    // state: {
    //   pagination,
    //   sorting,
    //   columnVisibility,
    //   rowSelection,
    //   columnFilters,
    // },
    // enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    filterFns: {
      ...(filterFns as Record<string, FilterFn<TData>>),
      fuzzy: fuzzyFilter,
    },
  })

  return { table }
}
