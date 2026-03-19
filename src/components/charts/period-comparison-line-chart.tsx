'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD } from '@/lib/formatters'
import type { DailyRevenue } from '@/lib/mock'

interface PeriodComparisonLineChartProps {
  currentPeriod: DailyRevenue[]
  previousPeriod: DailyRevenue[]
}

export function PeriodComparisonLineChart({
  currentPeriod,
  previousPeriod,
}: PeriodComparisonLineChartProps) {
  const maxLen = Math.max(currentPeriod.length, previousPeriod.length)
  const chartData = Array.from({ length: maxLen }, (_, i) => ({
    day: `Day ${i + 1}`,
    current: currentPeriod[i]?.revenue || 0,
    previous: previousPeriod[i]?.revenue || 0,
  }))

  return (
    <ChartCard title="Period Comparison">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="day"
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
              formatter={(value, name) => [
                formatUSD(Number(value)),
                name === 'current' ? 'Current Period' : 'Previous Period',
              ]}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Legend
              content={() => (
                <div className="flex justify-center gap-6 pt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <svg width="24" height="2">
                      <line
                        x1="0"
                        y1="1"
                        x2="24"
                        y2="1"
                        stroke="hsl(220, 70%, 50%)"
                        strokeWidth={2}
                      />
                    </svg>
                    <span className="text-muted-foreground">Current Period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="24" height="2">
                      <line
                        x1="0"
                        y1="1"
                        x2="24"
                        y2="1"
                        stroke="hsl(262, 60%, 55%)"
                        strokeWidth={2}
                        strokeDasharray="4 3"
                      />
                    </svg>
                    <span className="text-muted-foreground">Previous Period</span>
                  </div>
                </div>
              )}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="hsl(220, 70%, 50%)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="hsl(262, 60%, 55%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
