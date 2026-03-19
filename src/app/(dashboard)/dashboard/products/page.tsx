'use client'

import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { ProductMixDonutChart } from '@/components/charts/product-mix-donut-chart'
import { TopProductsBarChart } from '@/components/charts/top-products-bar-chart'
import { ProductRankingTable } from '@/components/tables/product-ranking-table'
import { CategoryFilter } from '@/components/filters/category-filter'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { formatUSD, formatNumber } from '@/lib/formatters'

export default function ProductsPage() {
  const { kpis, categoryRevenue, productRankings } = useDashboardData()

  return (
    <>
      <PageHeader title="Product Mix" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            title="Active Products"
            value={String(kpis.activeProducts)}
            trend="+3"
            trendDirection="up"
          />
          <KpiCard
            title="Top Product Revenue"
            value={formatUSD(kpis.topProductRevenue)}
            trend="+15.4%"
            trendDirection="up"
          />
          <KpiCard
            title="Avg Items per Order"
            value={formatNumber(kpis.avgItemsPerOrder)}
            trend="+0.3"
            trendDirection="up"
          />
        </div>

        {/* Filter Bar */}
        <CategoryFilter />

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <ProductMixDonutChart data={categoryRevenue} />
          <TopProductsBarChart data={productRankings} />
        </div>

        {/* Table */}
        <ProductRankingTable data={productRankings} />
      </div>
    </>
  )
}
