'use client'

import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { UnitComparisonBarChart } from '@/components/charts/unit-comparison-bar-chart'
import { UnitMetricsTable } from '@/components/tables/unit-metrics-table'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { useFilterStore } from '@/stores/filter-store'
import { formatUSD } from '@/lib/formatters'

export default function UnitsPage() {
  const { kpis, unitMetrics, allUnitMetrics } = useDashboardData()
  const { selectedUnitId } = useFilterStore()

  return (
    <>
      <PageHeader title="Units & Franchises" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            title="Active Units"
            value={String(kpis.activeUnits)}
            trend="+1"
            trendDirection="up"
          />
          <KpiCard
            title="Best Unit Revenue"
            value={formatUSD(kpis.bestUnitRevenue)}
            trend="+11.2%"
            trendDirection="up"
          />
          <KpiCard
            title="Avg Revenue per Unit"
            value={formatUSD(kpis.avgRevenuePerUnit)}
            trend="+7.8%"
            trendDirection="up"
          />
        </div>

        {/* Chart */}
        <UnitComparisonBarChart data={allUnitMetrics} selectedUnitId={selectedUnitId} />

        {/* Table */}
        <UnitMetricsTable data={unitMetrics} />
      </div>
    </>
  )
}
