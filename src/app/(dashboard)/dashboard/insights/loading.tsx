import { KpiCardSkeleton } from '@/components/skeletons/kpi-card-skeleton'
import { ChartCardSkeleton } from '@/components/skeletons/chart-card-skeleton'

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      {/* Alert cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <KpiCardSkeleton key={`alert-${i}`} />
        ))}
      </div>

      {/* Chart skeleton */}
      <ChartCardSkeleton />

      {/* Highlight cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <KpiCardSkeleton key={`highlight-${i}`} />
        ))}
      </div>
    </div>
  )
}
