'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD } from '@/lib/formatters'
import { CHART_PRIMARY } from '@/constants/colors'
import type { DailyRevenue } from '@/lib/mock'

interface RevenueLineChartProps {
  data: DailyRevenue[]
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  const chartData = data.map((d) => ({
    date: d.date.slice(5),
    revenue: d.revenue,
  }))

  return (
    <ChartCard title="Revenue Trend" isEmpty={data.length === 0}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
              interval="preserveStartEnd"
            />
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
              itemStyle={{ color: 'var(--foreground)' }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={CHART_PRIMARY}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
