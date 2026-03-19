'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { formatUSD, formatNumber, formatPercent } from '@/lib/formatters'
import { Badge } from '@/components/ui/badge'
import type { UnitMetric } from '@/lib/mock'

const columns: ColumnDef<UnitMetric, unknown>[] = [
  {
    accessorKey: 'unitName',
    header: 'Unit',
    cell: ({ row }) => <span className="font-medium">{row.original.unitName}</span>,
  },
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
  {
    accessorKey: 'growthPercent',
    header: 'Growth',
    cell: ({ row }) => {
      const growth = row.original.growthPercent
      return (
        <Badge
          variant={growth >= 0 ? 'secondary' : 'destructive'}
          className={growth >= 0 ? 'text-emerald-600' : ''}
        >
          {growth >= 0 ? '↑' : '↓'} {formatPercent(Math.abs(growth))}
        </Badge>
      )
    },
  },
]

interface SalesByUnitTableProps {
  data: UnitMetric[]
}

export function SalesByUnitTable({ data }: SalesByUnitTableProps) {
  return <DataTable columns={columns} data={data} />
}
