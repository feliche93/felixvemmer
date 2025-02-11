import type { FC, PropsWithChildren } from 'react'

export interface DataTableActionsProps extends PropsWithChildren {}

export const DataTableToolbarActions: FC<DataTableActionsProps> = ({ children }) => {
  return <div className="grid grid-cols-1 justify-end gap-2 sm:flex">{children}</div>
}
