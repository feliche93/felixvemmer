import { Cross2Icon } from '@radix-ui/react-icons'
import type { FC } from 'react'
import { Button } from '../ui/button'

export interface DataTableResetFilterProps {
  isFiltered: boolean
  onClick: () => void
}
export const DataTableResetFilter: FC<DataTableResetFilterProps> = ({ isFiltered, onClick }) => {
  if (!isFiltered) return null

  return (
    <Button
      aria-label="Reset filters"
      variant="ghost"
      className="h-8 px-2 lg:px-3"
      onClick={onClick}
    >
      Reset
      <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
    </Button>
  )
}
