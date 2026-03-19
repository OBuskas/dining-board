import { create } from 'zustand'

interface FilterState {
  dateRange: { from: Date; to: Date }
  selectedUnitId: string | null
  selectedCategoryId: string | null
  setDateRange: (from: Date, to: Date) => void
  setSelectedUnit: (unitId: string | null) => void
  setSelectedCategory: (categoryId: string | null) => void
}

// Default: last 30 days (reference date: Mar 15, 2026)
const defaultTo = new Date(2026, 2, 15)
const defaultFrom = new Date(2026, 1, 13)

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: { from: defaultFrom, to: defaultTo },
  selectedUnitId: null,
  selectedCategoryId: null,
  setDateRange: (from, to) => set({ dateRange: { from, to } }),
  setSelectedUnit: (unitId) => set({ selectedUnitId: unitId }),
  setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),
}))
