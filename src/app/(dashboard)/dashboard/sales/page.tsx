import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { Placeholder } from '@/components/placeholder'

export default function SalesPage() {
  return (
    <>
      <PageHeader title="Sales Analytics" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard title="Monthly Revenue" value="R$ 423.150" trend="+9.8%" trendDirection="up" />
          <KpiCard title="Revenue per Unit" value="R$ 84.630" trend="+5.2%" trendDirection="up" />
          <KpiCard title="Best Day Revenue" value="R$ 28.940" trend="+12.0%" trendDirection="up" />
        </div>

        {/* Filter Bar */}
        <div className="flex gap-3">
          <Placeholder label="Date Range Picker" height="h-10" className="w-56" />
          <Placeholder label="Unit Selector" height="h-10" className="w-48" />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Placeholder label="Dual Line Chart: Period Comparison" />
          <Placeholder label="Bar Chart: Revenue per Unit" />
        </div>

        {/* Table */}
        <Placeholder
          label="Data Table: Sales by Unit — Unit · Revenue · Orders · Avg Ticket · Growth %"
          height="h-80"
        />
      </div>
    </>
  )
}
