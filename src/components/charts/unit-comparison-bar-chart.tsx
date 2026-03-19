'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { ChartCard } from './chart-card'
import { formatCompactUSD, formatUSD, formatNumber } from '@/lib/formatters'
import type { UnitMetric } from '@/lib/mock'

const MAX_UNITS = 10
const OTHERS_ID = '__others__'
const REVENUE_COLOR = 'hsl(220, 70%, 50%)'
const ORDERS_COLOR = 'hsl(142, 70%, 45%)'
const OTHERS_COLOR = 'hsl(220, 15%, 55%)'
const DIMMED_COLOR = 'hsl(220, 10%, 70%)'
const DIMMED_OPACITY = 0.3

interface UnitComparisonBarChartProps {
  data: UnitMetric[]
  selectedUnitId: string | null
}

export function UnitComparisonBarChart({ data, selectedUnitId }: UnitComparisonBarChartProps) {
  const chartData = useMemo(() => {
    if (data.length <= MAX_UNITS) return data

    const top = data.slice(0, MAX_UNITS)
    const rest = data.slice(MAX_UNITS)

    const othersRevenue = rest.reduce((sum, m) => sum + m.revenue, 0)
    const othersOrders = rest.reduce((sum, m) => sum + m.orders, 0)

    const others: UnitMetric = {
      rank: MAX_UNITS + 1,
      unitId: OTHERS_ID,
      unitName: `Others (${rest.length})`,
      city: '',
      revenue: Math.round(othersRevenue * 100) / 100,
      orders: othersOrders,
      avgTicket: othersOrders > 0 ? Math.round((othersRevenue / othersOrders) * 100) / 100 : 0,
      growthPercent: 0,
    }

    return [...top, others]
  }, [data])

  function getBarFill(entry: UnitMetric, activeColor: string): string {
    if (entry.unitId === OTHERS_ID) return OTHERS_COLOR
    if (!selectedUnitId || entry.unitId === selectedUnitId) return activeColor
    return DIMMED_COLOR
  }

  function getBarOpacity(entry: UnitMetric): number {
    if (entry.unitId === OTHERS_ID) return 0.6
    if (!selectedUnitId || entry.unitId === selectedUnitId) return 1
    return DIMMED_OPACITY
  }

  return (
    <div className="grid gap-4">
      {/* Revenue by Unit */}
      <ChartCard title="Revenue by Unit">
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
              <Bar dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.unitId}
                    fill={getBarFill(entry, REVENUE_COLOR)}
                    fillOpacity={getBarOpacity(entry)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Orders by Unit */}
      <ChartCard title="Orders by Unit">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="unitName" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <YAxis
                tickFormatter={(v) => formatNumber(v)}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                width={50}
              />
              <Tooltip
                formatter={(value) => [formatNumber(Number(value)), 'Orders']}
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="orders" name="Orders" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.unitId}
                    fill={getBarFill(entry, ORDERS_COLOR)}
                    fillOpacity={getBarOpacity(entry)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  )
}
