import { KpiCardSkeleton } from './kpi-card-skeleton'
import { ChartCardSkeleton } from './chart-card-skeleton'
import { TableSkeleton } from './table-skeleton'

interface DashboardSkeletonProps {
  kpiCount?: number
  chartCount?: number
  tableCount?: number
}

export function DashboardSkeleton({
  kpiCount = 4,
  chartCount = 2,
  tableCount = 1,
}: DashboardSkeletonProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: kpiCount }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>

      {chartCount > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: chartCount }).map((_, i) => (
            <ChartCardSkeleton key={i} />
          ))}
        </div>
      )}

      {tableCount > 0 &&
        Array.from({ length: tableCount }).map((_, i) => <TableSkeleton key={i} />)}
    </div>
  )
}
