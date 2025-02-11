'use client'

import type { PropsWithChildren } from 'react'

import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import type { Table } from '@tanstack/react-table'

import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> extends PropsWithChildren {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table, children }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {children}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
