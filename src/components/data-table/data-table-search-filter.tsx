'use client'

import { cn } from '@/lib/utils'
import { parseAsString, useQueryState } from 'nuqs'
import { Input } from '../ui/input'
import { DataTableResetFilter } from './data-table-reset-filter'

interface SearchFilterProps<T> {
  placeholder: string
  className?: string
  searchParamName: Extract<keyof T, string>
}

export function SearchFilter<T>({ placeholder, className, searchParamName }: SearchFilterProps<T>) {
  const [value, setValue] = useQueryState(
    searchParamName,
    parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 500,
    }),
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)
  }

  function handleReset() {
    setValue('')
  }

  const isFiltered = value !== ''

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder={placeholder}
        value={value ?? ''}
        onChange={handleChange}
        className={cn('w-full sm:w-40 lg:w-64', className)}
      />
      <DataTableResetFilter isFiltered={isFiltered} onClick={handleReset} />
    </div>
  )
}
