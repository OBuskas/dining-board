import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { Placeholder } from '@/components/placeholder'

export default function UnitsPage() {
  return (
    <>
      <PageHeader title="Units & Franchises" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard title="Active Units" value="5" trend="+1" trendDirection="up" />
          <KpiCard
            title="Best Unit Revenue"
            value="R$ 312.450"
            trend="+11.2%"
            trendDirection="up"
          />
          <KpiCard
            title="Avg Revenue per Unit"
            value="R$ 249.578"
            trend="+7.8%"
            trendDirection="up"
          />
        </div>

        {/* Chart */}
        <Placeholder label="Grouped Bar Chart: Unit Comparison" />

        {/* Table */}
        <Placeholder
          label="Data Table: Unit Metrics — Unit · City · Revenue · Orders · Avg Ticket · Growth % · Rank"
          height="h-80"
        />
      </div>
    </>
  )
}
