'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { formatUSD, formatNumber } from '@/lib/formatters'
import type { UnitMetric } from '@/lib/mock'

const columns: ColumnDef<UnitMetric, unknown>[] = [
  {
    accessorKey: 'rank',
    header: '#',
    cell: ({ row }) => <span className="font-medium">{row.original.rank}</span>,
  },
  {
    accessorKey: 'unitName',
    header: 'Unit',
    cell: ({ row }) => <span className="font-medium">{row.original.unitName}</span>,
  },
  { accessorKey: 'city', header: 'City' },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) => formatUSD(row.original.revenue),
  },
  {
    accessorKey: 'orders',
    header: 'Orders',
    cell: ({ row }) => formatNumber(row.original.orders),
  },
  {
    accessorKey: 'avgTicket',
    header: 'Avg Ticket',
    cell: ({ row }) => formatUSD(row.original.avgTicket),
  },
]

interface TopFranchisesTableProps {
  data: UnitMetric[]
}

export function TopFranchisesTable({ data }: TopFranchisesTableProps) {
  return <DataTable columns={columns} data={data.slice(0, 5)} />
}
