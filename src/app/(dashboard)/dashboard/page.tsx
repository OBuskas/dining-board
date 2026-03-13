import { PageHeader } from '@/components/page-header'
import { KpiCard } from '@/components/kpi-card'
import { Placeholder } from '@/components/placeholder'

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard Overview" />

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Total Revenue" value="R$ 1.247.890" trend="+12.5%" trendDirection="up" />
          <KpiCard title="Total Orders" value="18.432" trend="+8.2%" trendDirection="up" />
          <KpiCard title="Average Ticket" value="R$ 67,72" trend="-2.1%" trendDirection="down" />
          <KpiCard title="Cancellation Rate" value="3.2%" trend="-0.8pp" trendDirection="up" />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Placeholder label="Line Chart: Revenue Trend" />
          <Placeholder label="Bar Chart: Revenue by Category" />
        </div>

        {/* Table */}
        <Placeholder label="Data Table: Top 5 Franchises" height="h-80" />
      </div>
    </>
  )
}
