'use client'

import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RevenueTrendAreaChart } from '@/components/charts/revenue-trend-area-chart'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { formatUSD } from '@/lib/formatters'

export default function InsightsPage() {
  const { kpis, dailyRevenue } = useDashboardData()

  return (
    <>
      <PageHeader title="Insights & Trends" />

      <div className="space-y-6 p-6">
        {/* Alert Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Alert</CardTitle>
                <Badge variant="destructive">Critical</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Unit Centro recorded a 23% revenue drop compared to last month. Review operational
                metrics for possible causes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Growth Trend</CardTitle>
                <Badge variant="secondary">Positive</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Overall revenue grew 15% across all units this quarter. Delivery channel contributed
                40% of the increase.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Alert</CardTitle>
                <Badge variant="outline">Info</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                &quot;Salad Bowl Premium&quot; sales dropped 35% in the last 2 weeks. Consider
                running a promotion or reviewing pricing.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <RevenueTrendAreaChart data={dailyRevenue} />

        {/* Highlight Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">Best Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kpis.bestDayName}</p>
              <p className="text-muted-foreground text-sm">
                Best day of the week by average revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Top Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kpis.topProductName}</p>
              <p className="text-muted-foreground text-sm">
                {formatUSD(kpis.topProductRevenue)} in revenue this period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">Star Unit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kpis.bestUnitName}</p>
              <p className="text-muted-foreground text-sm">
                {formatUSD(kpis.bestUnitRevenue)} this period
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
