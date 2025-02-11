import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons'
import type { Column } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { sortColParser, sortDirParser } from '@/search-params/table'
import { useQueryState } from 'nuqs'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [sortDir, setSortDir] = useQueryState('sortDir', sortDirParser())
  const [sortCol, setSortCol] = useQueryState('sortCol', sortColParser())

  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  const sortOrder = ['asc', 'desc'] as const

  const handleSort = (isDescending: boolean) => {
    const newSortDir = isDescending ? 'desc' : 'asc'
    setSortDir(newSortDir)
    setSortCol(column.id)
    column.toggleSorting(isDescending)
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === 'desc'
                ? 'Sorted descending. Click to sort ascending.'
                : column.getIsSorted() === 'asc'
                  ? 'Sorted ascending. Click to sort descending.'
                  : 'Not sorted. Click to sort ascending.'
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getCanSort() && column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 size-4" aria-hidden="true" />
            ) : (
              <CaretSortIcon className="ml-2 size-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem aria-label="Sort ascending" onClick={() => handleSort(false)}>
                <ArrowUpIcon
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem aria-label="Sort descending" onClick={() => handleSort(true)}>
                <ArrowDownIcon
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Desc
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && <DropdownMenuSeparator />}
          {column.getCanHide() && (
            <DropdownMenuItem
              aria-label="Hide column"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeNoneIcon className="mr-2 size-3.5 text-muted-foreground/70" aria-hidden="true" />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
