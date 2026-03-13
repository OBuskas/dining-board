import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { Placeholder } from '@/components/placeholder'

export default function ProductsPage() {
  return (
    <>
      <PageHeader title="Product Mix" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard title="Active Products" value="47" trend="+3" trendDirection="up" />
          <KpiCard
            title="Top Product Revenue"
            value="R$ 89.230"
            trend="+15.4%"
            trendDirection="up"
          />
          <KpiCard title="Avg Items per Order" value="3.2" trend="+0.3" trendDirection="up" />
        </div>

        {/* Filter Bar */}
        <Placeholder label="Category Filter" height="h-10" className="w-56" />

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Placeholder label="Donut Chart: Product Mix by Category" />
          <Placeholder label="Bar Chart: Top 10 Products" />
        </div>

        {/* Table */}
        <Placeholder
          label="Data Table: Product Ranking — Rank · Product · Category · Units Sold · Revenue · Mix %"
          height="h-80"
        />
      </div>
    </>
  )
}
