import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton'

export default function Loading() {
  return <DashboardSkeleton kpiCount={3} chartCount={2} tableCount={1} />
}
