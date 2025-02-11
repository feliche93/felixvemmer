import type { FC, PropsWithChildren } from 'react'

export interface DataTableToolbarFiltersProps extends PropsWithChildren {}

export const DataTableToolbarFilters: FC<DataTableToolbarFiltersProps> = ({ children }) => {
  return (
    <div className="grid grow grid-cols-1 flex-wrap justify-start gap-2 sm:flex">{children}</div>
  )
}
