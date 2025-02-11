'use client'

import type { DataTableFilterField } from '@/types'
import type { Table } from '@tanstack/react-table'
import type * as React from 'react'

import { cn } from '@/lib/utils'

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-1 flex-row items-start justify-between gap-4 sm:flex',
        className,
      )}
    >
      {children}
    </div>
  )
}
