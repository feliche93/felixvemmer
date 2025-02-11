'use client'

import type { PropsWithChildren } from 'react'

export interface DataTableRowActionsProps extends PropsWithChildren {}

export function DataTableRowActions({ children }: DataTableRowActionsProps) {
  return <div className="-px-2 flex flex-row items-center justify-start gap-1">{children}</div>
}
