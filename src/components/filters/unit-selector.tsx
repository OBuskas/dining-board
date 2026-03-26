'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useFilterStore } from '@/stores/filter-store'
import { units } from '@/lib/mock'

export function UnitSelector() {
  const selectedUnitId = useFilterStore((s) => s.selectedUnitId)
  const setSelectedUnit = useFilterStore((s) => s.setSelectedUnit)

  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null
  const selectedLabel = selectedUnit ? `${selectedUnit.state} - ${selectedUnit.name}` : 'All Units'

  function handleChange(value: string | null) {
    setSelectedUnit(!value || value === 'all' ? null : value)
  }

  return (
    <Select value={selectedUnitId || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="h-9 w-full text-xs sm:w-48" aria-label="Select unit">
        {selectedLabel}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Units</SelectItem>
        {units.map((unit) => (
          <SelectItem key={unit.id} value={unit.id}>
            {unit.state} - {unit.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
