'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { formatUSD, formatNumber, formatPercent } from '@/lib/formatters'
import type { ProductRanking } from '@/lib/mock'

const columns: ColumnDef<ProductRanking, unknown>[] = [
  {
    accessorKey: 'rank',
    header: '#',
    cell: ({ row }) => <span className="font-medium">{row.original.rank}</span>,
  },
  {
    accessorKey: 'productName',
    header: 'Produto',
    cell: ({ row }) => <span className="font-medium">{row.original.productName}</span>,
  },
  { accessorKey: 'categoryName', header: 'Category' },
  {
    accessorKey: 'unitsSold',
    header: 'Qty Sold',
    cell: ({ row }) => formatNumber(row.original.unitsSold),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) => formatUSD(row.original.revenue),
  },
  {
    accessorKey: 'mixPercent',
    header: 'Mix %',
    cell: ({ row }) => formatPercent(row.original.mixPercent),
  },
]

interface ProductRankingTableProps {
  data: ProductRanking[]
}

export function ProductRankingTable({ data }: ProductRankingTableProps) {
  return <DataTable columns={columns} data={data} />
}
