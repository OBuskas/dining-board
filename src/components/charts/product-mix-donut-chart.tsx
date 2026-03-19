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

  return (
    <ChartCard title="Product Mix by Category">
      <div className="h-64">
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
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            />
            <Tooltip
              formatter={(value) => [formatUSD(Number(value)), 'Revenue']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
