'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { formatUSD, formatDate } from '@/lib/formatters'
import { Badge } from '@/components/ui/badge'
import { CHANNEL_LABELS } from '@/constants/colors'
import type { Order } from '@/lib/schemas'

interface OrderRow {
  id: string
  date: Date
  unitName: string
  channel: string
  itemCount: number
  total: number
  status: string
}

const columns: ColumnDef<OrderRow, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => formatDate(row.original.date, 'MM/dd HH:mm'),
  },
  {
    accessorKey: 'unitName',
    header: 'Unit',
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => CHANNEL_LABELS[row.original.channel] || row.original.channel,
  },
  {
    accessorKey: 'itemCount',
    header: 'Items',
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => formatUSD(row.original.total),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const variant =
        status === 'completed' ? 'secondary' : status === 'cancelled' ? 'destructive' : 'outline'
      const label =
        status === 'completed' ? 'Completed' : status === 'cancelled' ? 'Cancelled' : 'In Progress'
      const className = status === 'completed' ? 'text-emerald-600' : ''
      return (
        <Badge variant={variant} className={className}>
          {label}
        </Badge>
      )
    },
  },
]

interface RecentOrdersTableProps {
  orders: Order[]
  unitNames: Map<string, string>
  limit?: number
}

export function RecentOrdersTable({ orders, unitNames, limit = 50 }: RecentOrdersTableProps) {
  const rows: OrderRow[] = orders
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit)
    .map((o) => ({
      id: o.id,
      date: o.date,
      unitName: unitNames.get(o.unitId) || o.unitId,
      channel: o.channel,
      itemCount: o.items.reduce((s, i) => s + i.quantity, 0),
      total: o.total,
      status: o.status,
    }))

  return <DataTable columns={columns} data={rows} />
}
