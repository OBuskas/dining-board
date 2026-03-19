import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton'

export default function Loading() {
  return <DashboardSkeleton kpiCount={3} chartCount={1} tableCount={0} />
}
