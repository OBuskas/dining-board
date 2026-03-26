'use client'

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { formatUSD } from '@/lib/formatters'
import type { CategoryRevenue } from '@/lib/mock'

interface ProductMixDonutChartProps {
  data: CategoryRevenue[]
}

export function ProductMixDonutChart({ data }: ProductMixDonutChartProps) {
  const chartData = data.map((d) => ({ ...d, fill: d.color }))
  const total = chartData.reduce((sum, d) => sum + d.revenue, 0)

  return (
    <ChartCard title="Product Mix by Category" isEmpty={data.length === 0}>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
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
            <Legend
              formatter={(value) => {
                const item = chartData.find((d) => d.categoryName === value)
                const pct = item && total > 0 ? ((item.revenue / total) * 100).toFixed(0) : '0'
                return `${value} (${pct}%)`
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
