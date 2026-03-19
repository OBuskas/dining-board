'use client'

import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { PeriodComparisonLineChart } from '@/components/charts/period-comparison-line-chart'
import { RevenuePerUnitBarChart } from '@/components/charts/revenue-per-unit-bar-chart'
import { SalesByUnitTable } from '@/components/tables/sales-by-unit-table'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { formatUSD } from '@/lib/formatters'

export default function SalesPage() {
  const { kpis, dailyRevenue, previousDailyRevenue, unitMetrics } = useDashboardData()

  return (
    <>
      <PageHeader title="Sales Analytics" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            title="Monthly Revenue"
            value={formatUSD(kpis.monthlyRevenue)}
            trend="+9.8%"
            trendDirection="up"
          />
          <KpiCard
            title="Revenue per Unit"
            value={formatUSD(kpis.revenuePerUnit)}
            trend="+5.2%"
            trendDirection="up"
          />
          <KpiCard
            title="Best Day Revenue"
            value={formatUSD(kpis.bestDayRevenue)}
            trend="+12.0%"
            trendDirection="up"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PeriodComparisonLineChart
            currentPeriod={dailyRevenue}
            previousPeriod={previousDailyRevenue}
          />
          <RevenuePerUnitBarChart data={unitMetrics} />
        </div>

        {/* Table */}
        <SalesByUnitTable data={unitMetrics} />
      </div>
    </>
  )
}
