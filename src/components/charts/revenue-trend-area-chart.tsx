'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD } from '@/lib/formatters'
import type { DailyRevenue } from '@/lib/mock'

interface RevenueTrendAreaChartProps {
  data: DailyRevenue[]
  projectionDays?: number
}

export function RevenueTrendAreaChart({ data, projectionDays = 15 }: RevenueTrendAreaChartProps) {
  const recentData = data.slice(-30)

  const last7 = data.slice(-7)
  const avgRevenue = last7.reduce((s, d) => s + d.revenue, 0) / (last7.length || 1)
  const avgGrowth = 1.002

  const projectedData = Array.from({ length: projectionDays }, (_, i) => {
    const lastDate = new Date(recentData[recentData.length - 1]?.date ?? '2026-03-15')
    lastDate.setDate(lastDate.getDate() + i + 1)
    const m = String(lastDate.getMonth() + 1).padStart(2, '0')
    const d = String(lastDate.getDate()).padStart(2, '0')
    return {
      date: `${m}-${d}`,
      revenue: null as number | null,
      projected: Math.round(avgRevenue * Math.pow(avgGrowth, i + 1) * 100) / 100,
    }
  })

  const chartData = [
    ...recentData.map((d) => ({
      date: d.date.slice(5),
      revenue: d.revenue as number | null,
      projected: null as number | null,
    })),
    ...(recentData.length > 0
      ? [
          {
            date: recentData[recentData.length - 1].date.slice(5),
            revenue: recentData[recentData.length - 1].revenue as number | null,
            projected: recentData[recentData.length - 1].revenue as number | null,
          },
        ]
      : []),
    ...projectedData,
  ]

  return (
    <ChartCard title="Revenue Trend + Projection">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
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
              formatter={(value, name) => [
                formatUSD(Number(value)),
                name === 'revenue' ? 'Actual Revenue' : 'Projection',
              ]}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(220, 70%, 50%)"
              fill="hsl(220, 70%, 50%)"
              fillOpacity={0.2}
              strokeWidth={2}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="hsl(142, 70%, 45%)"
              fill="hsl(142, 70%, 45%)"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
