'use client'

import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { RevenueLineChart } from '@/components/charts/revenue-line-chart'
import { RevenueByCategoryBarChart } from '@/components/charts/revenue-by-category-bar-chart'
import { TopFranchisesTable } from '@/components/tables/top-franchises-table'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { formatUSD, formatNumber, formatPercent } from '@/lib/formatters'

export default function DashboardPage() {
  const { kpis, dailyRevenue, categoryRevenue, unitMetrics } = useDashboardData()

  return (
    <>
      <PageHeader title="Dashboard Overview" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Revenue"
            value={formatUSD(kpis.totalRevenue)}
            trend="+12.5%"
            trendDirection="up"
          />
          <KpiCard
            title="Total Orders"
            value={formatNumber(kpis.totalOrders)}
            trend="+8.2%"
            trendDirection="up"
          />
          <KpiCard
            title="Average Ticket"
            value={formatUSD(kpis.avgTicket)}
            trend="-2.1%"
            trendDirection="down"
          />
          <KpiCard
            title="Cancellation Rate"
            value={formatPercent(kpis.cancellationRate)}
            trend="-0.8pp"
            trendDirection="up"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueLineChart data={dailyRevenue} />
          <RevenueByCategoryBarChart data={categoryRevenue} />
        </div>

        {/* Table */}
        <TopFranchisesTable data={unitMetrics} />
      </div>
    </>
  )
}
