'use client'

import { cn } from '@/lib/utils'
import type { Table } from '@tanstack/react-table'
import { parseAsFloat, parseAsString, useQueryState } from 'nuqs'
import { useCallback, useEffect, useMemo } from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DataTableResetFilter } from './data-table-reset-filter'

interface MinMaxFilterProps<T> {
  table: Table<T>
  columnNames: Extract<keyof T, string>[]
  className?: string
  placeholder?: string
}

export function MinMaxFilter<T>({
  table,
  columnNames,
  className,
  placeholder,
}: MinMaxFilterProps<T>) {
  const [min, setMin] = useQueryState(
    `min`,
    parseAsFloat.withOptions({ clearOnDefault: true, shallow: false }),
  )
  const [max, setMax] = useQueryState(
    `max`,
    parseAsFloat.withOptions({ clearOnDefault: true, shallow: false }),
  )
  const [minMaxFilter, setMinMaxFilter] = useQueryState(
    `minMaxFilter`,
    parseAsString.withOptions({ clearOnDefault: true, shallow: false }),
  )

  const isFiltered = min !== null || max !== null || minMaxFilter !== null

  const columnLabels = useMemo(() => {
    return table.getAllColumns().reduce<Record<string, string>>((acc, column) => {
      if (columnNames.includes(column.id as Extract<keyof T, string>)) {
        acc[column.id] =
          column.columnDef.header instanceof Function
            ? column.columnDef.header({ column, table } as any).props.title
            : column.id
      }
      return acc
    }, {})
  }, [table, columnNames])

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setMin(value === '' ? null : Number(value))
    },
    [setMin],
  )

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setMax(value === '' ? null : Number(value))
    },
    [setMax],
  )

  const handleColumnChange = useCallback(
    (value: string) => {
      setMinMaxFilter(value || null)
      setMin(null)
      setMax(null)
    },
    [setMinMaxFilter, setMin, setMax],
  )

  const handleReset = useCallback(() => {
    setMin(null)
    setMax(null)
    setMinMaxFilter(null)
  }, [setMin, setMax, setMinMaxFilter])

  // Reset minMaxFilter to null if it's not in columnNames
  useEffect(() => {
    if (minMaxFilter && !columnNames.includes(minMaxFilter as any)) {
      setMinMaxFilter(null)
    }
  }, [minMaxFilter, columnNames, setMinMaxFilter])

  return (
    <div className="flex items-center gap-2">
      <Select value={minMaxFilter || ''} onValueChange={handleColumnChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select column" />
        </SelectTrigger>
        <SelectContent>
          {columnNames.map((columnName) => (
            <SelectItem key={columnName} value={columnName}>
              {columnLabels[columnName] || columnName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder={'Min'}
        value={min ?? ''}
        onChange={handleMinChange}
        className={cn('w-24', className)}
      />
      <Input
        type="number"
        placeholder={'Max'}
        value={max ?? ''}
        onChange={handleMaxChange}
        className={cn('w-24', className)}
      />
      <DataTableResetFilter isFiltered={isFiltered} onClick={handleReset} />
    </div>
  )
}
