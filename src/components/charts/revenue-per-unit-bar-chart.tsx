'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD } from '@/lib/formatters'
import { UNIT_COLORS } from '@/constants/colors'
import type { UnitMetric } from '@/lib/mock'

interface RevenuePerUnitBarChartProps {
  data: UnitMetric[]
}

export function RevenuePerUnitBarChart({ data }: RevenuePerUnitBarChartProps) {
  const chartData = data.map((d, i) => ({
    ...d,
    fill: UNIT_COLORS[i % UNIT_COLORS.length],
  }))

  return (
    <ChartCard title="Revenue per Unit">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="unitName" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <YAxis
              tickFormatter={(v) => formatCompactUSD(v)}
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
              width={70}
            />
            <Tooltip
              formatter={(value) => [formatUSD(Number(value)), 'Revenue']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
