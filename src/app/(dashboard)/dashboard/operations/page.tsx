import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { Placeholder } from '@/components/placeholder'

export default function OperationsPage() {
  return (
    <>
      <PageHeader title="Operations & Orders" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Orders Today" value="342" trend="+18.5%" trendDirection="up" />
          <KpiCard title="Cancellation Rate" value="2.3%" trend="-0.5pp" trendDirection="up" />
          <KpiCard title="Peak Hour" value="12:00–13:00" trend="" trendDirection="neutral" />
          <KpiCard title="Avg Prep Time" value="18 min" trend="-2 min" trendDirection="up" />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Placeholder label="Bar Chart: Orders by Hour" />
          <Placeholder label="Pie Chart: Orders by Channel" />
        </div>

        {/* Table */}
        <Placeholder
          label="Data Table: Recent Orders — ID · Date · Unit · Channel · Items · Total · Status"
          height="h-80"
        />
      </div>
    </>
  )
}
