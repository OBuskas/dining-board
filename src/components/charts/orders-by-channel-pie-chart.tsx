'use client'

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { CHANNEL_COLORS } from '@/constants/colors'
import type { ChannelDistribution } from '@/lib/mock'

interface OrdersByChannelPieChartProps {
  data: ChannelDistribution[]
}

export function OrdersByChannelPieChart({ data }: OrdersByChannelPieChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    fill: CHANNEL_COLORS[d.channel],
  }))

  return (
    <ChartCard title="Orders by Channel" isEmpty={data.length === 0}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
            <Pie
              data={chartData}
              dataKey="orders"
              nameKey="label"
              cx="50%"
              cy="45%"
              outerRadius={85}
              label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
            />
            <Tooltip
              formatter={(value) => [Number(value).toLocaleString('en-US'), 'Orders']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
              itemStyle={{ color: 'var(--foreground)' }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
