'use client'

import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { OrdersByHourBarChart } from '@/components/charts/orders-by-hour-bar-chart'
import { OrdersByChannelPieChart } from '@/components/charts/orders-by-channel-pie-chart'
import { RecentOrdersTable } from '@/components/tables/recent-orders-table'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { formatPercent } from '@/lib/formatters'

export default function OperationsPage() {
  const { kpis, hourlyOrders, channelDistribution, filteredOrders, unitNameMap } =
    useDashboardData()

  return (
    <>
      <PageHeader title="Operations & Orders" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Orders Today"
            value={String(kpis.totalOrders)}
            trend="+18.5%"
            trendDirection="up"
          />
          <KpiCard
            title="Cancellation Rate"
            value={formatPercent(kpis.cancellationRate)}
            trend="-0.5pp"
            trendDirection="up"
          />
          <KpiCard title="Peak Hour" value={kpis.peakHour} trend="" trendDirection="neutral" />
          <KpiCard
            title="Avg Prep Time"
            value={`${kpis.avgPrepTime} min`}
            trend="-2 min"
            trendDirection="up"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <OrdersByHourBarChart data={hourlyOrders} />
          <OrdersByChannelPieChart data={channelDistribution} />
        </div>

        {/* Table */}
        <RecentOrdersTable orders={filteredOrders} unitNames={unitNameMap} />
      </div>
    </>
  )
}
