'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { CHART_PRIMARY } from '@/constants/colors'
import type { HourlyOrders } from '@/lib/mock'

interface OrdersByHourBarChartProps {
  data: HourlyOrders[]
}

export function OrdersByHourBarChart({ data }: OrdersByHourBarChartProps) {
  return (
    <ChartCard title="Orders by Hour" isEmpty={data.length === 0}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              className="fill-muted-foreground"
              interval={1}
            />
            <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" width={45} />
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
            <Bar dataKey="orders" fill={CHART_PRIMARY} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
