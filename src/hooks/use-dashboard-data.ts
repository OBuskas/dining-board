import { useMemo } from 'react'
import { useFilterStore } from '@/stores/filter-store'
import { mockAdapter } from '@/lib/adapters/mock-adapter'

export function useDashboardData() {
  const { dateRange, selectedUnitId, selectedCategoryId } = useFilterStore()

  return useMemo(
    () => mockAdapter.getData({ dateRange, selectedUnitId, selectedCategoryId }),
    [dateRange, selectedUnitId, selectedCategoryId]
  )
}
