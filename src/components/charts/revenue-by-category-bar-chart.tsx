'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD } from '@/lib/formatters'
import type { CategoryRevenue } from '@/lib/mock'

interface RevenueByCategoryBarChartProps {
  data: CategoryRevenue[]
}

export function RevenueByCategoryBarChart({ data }: RevenueByCategoryBarChartProps) {
  const chartData = data.map((d) => ({ ...d, fill: d.color }))

  return (
    <ChartCard title="Revenue by Category">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v) => formatCompactUSD(v)}
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
            />
            <YAxis
              type="category"
              dataKey="categoryName"
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
              width={120}
            />
            <Tooltip
              formatter={(value) => [formatUSD(Number(value)), 'Revenue']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
