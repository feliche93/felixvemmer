'use client'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { Globe } from 'lucide-react'
import Link from 'next/link'

export type TRow = {
  id: string
  name: string
  description: string | null
  license: string | null
  homepageUrl: string | null
  repositoryUrl: string | null
  bugsUrl: string | null
  npmUrl: string
  dependents: number
  isInsecure: boolean
  publisherName: string
  publisherEmail: string
  popularity: number
  quality: number
  maintenance: number
  finalScore: number
  createdAt: string
  updatedAt: string
  nodeSubcategory: string | null
}

export function fetchNodesTableColumnDef(): ColumnDef<TRow, unknown>[] {
  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => {
    //         table.toggleAllPageRowsSelected(!!value)
    //       }}
    //       aria-label="Select all"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => {
    //         row.toggleSelected(!!value)
    //       }}
    //       aria-label="Select row"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{row.original.name}</span>
          {row.original.isInsecure && (
            <Badge variant="destructive" className="ml-2">
              Insecure
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => <div className="max-w-[250px] truncate">{row.original.description}</div>,
    },
    {
      accessorKey: 'nodeSubcategory',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Node Subcategory" />,
      cell: ({ row }) => <div>{row.original.nodeSubcategory}</div>,
    },
    {
      accessorKey: 'license',
      header: ({ column }) => <DataTableColumnHeader column={column} title="License" />,
      cell: ({ row }) => <div>{row.original.license}</div>,
    },
    {
      accessorKey: 'links',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Links" />,
      cell: ({ row }) => (
        <div className="flex space-x-4">
          {row.original.npmUrl && (
            <Link href={row.original.npmUrl} target="_blank" className="hover:text-primary">
              <Icons.npm className="h-4 w-4" />
            </Link>
          )}
          {row.original.repositoryUrl && (
            <Link href={row.original.repositoryUrl} target="_blank" className="hover:text-primary">
              <Icons.gitHub className="h-4 w-4" />
            </Link>
          )}
          {row.original.homepageUrl && (
            <Link href={row.original.homepageUrl} target="_blank" className="hover:text-primary">
              <Globe className="h-4 w-4" />
            </Link>
          )}
        </div>
      ),
      enableSorting: false,
    },
    // {
    //   accessorKey: 'dependents',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Dependents" />,
    //   cell: ({ row }) => <div>{row.original.dependents.toLocaleString()}</div>,
    // },
    {
      accessorKey: 'publisher',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Publisher" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.publisherName}</span>
          <span className="text-muted-foreground text-sm">{row.original.publisherEmail}</span>
        </div>
      ),
    },
    // {
    //   accessorKey: 'finalScore',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Final Score" />,
    //   cell: ({ row }) => (
    //     <div className="font-medium">{(row.original.finalScore * 100).toFixed(1)}</div>
    //   ),
    // },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: ({ row }) => (
        <div>{formatDistanceToNow(new Date(row.original.createdAt), { addSuffix: true })}</div>
      ),
    },
  ]
}
