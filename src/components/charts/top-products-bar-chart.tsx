'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD } from '@/lib/formatters'
import { CHART_PRIMARY } from '@/constants/colors'
import type { ProductRanking } from '@/lib/mock'

interface TopProductsBarChartProps {
  data: ProductRanking[]
}

export function TopProductsBarChart({ data }: TopProductsBarChartProps) {
  const top10 = data.slice(0, 10)

  return (
    <ChartCard title="Top 10 Products" isEmpty={data.length === 0}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v) => formatCompactUSD(v)}
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
            />
            <YAxis
              type="category"
              dataKey="productName"
              tick={{ fontSize: 11 }}
              className="fill-muted-foreground"
              width={130}
            />
            <Tooltip
              formatter={(value) => [formatUSD(Number(value)), 'Revenue']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
              itemStyle={{ color: 'var(--foreground)' }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Bar dataKey="revenue" fill={CHART_PRIMARY} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
