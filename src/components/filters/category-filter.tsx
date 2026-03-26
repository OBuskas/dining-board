'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilterStore } from '@/stores/filter-store'
import { categories } from '@/lib/mock'

export function CategoryFilter() {
  const selectedCategoryId = useFilterStore((s) => s.selectedCategoryId)
  const setSelectedCategory = useFilterStore((s) => s.setSelectedCategory)

  function handleChange(value: string | null) {
    setSelectedCategory(!value || value === 'all' ? null : value)
  }

  return (
    <Select value={selectedCategoryId || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="h-10 w-full text-sm sm:w-56" aria-label="Filter by category">
        <SelectValue>
          {() =>
            selectedCategoryId
              ? (categories.find((c) => c.id === selectedCategoryId)?.name ?? selectedCategoryId)
              : 'All Categories'
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
