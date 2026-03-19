'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilterStore } from '@/stores/filter-store'
import { useState } from 'react'

const REF_DATE = new Date(2026, 2, 15)

const presets = [
  {
    label: '7 days',
    value: '7d',
    from: new Date(2026, 2, 8),
    to: REF_DATE,
  },
  {
    label: '30 days',
    value: '30d',
    from: new Date(2026, 1, 13),
    to: REF_DATE,
  },
  {
    label: '90 days',
    value: '90d',
    from: new Date(2025, 11, 16),
    to: REF_DATE,
  },
  {
    label: 'This month',
    value: 'this_month',
    from: new Date(2026, 2, 1),
    to: REF_DATE,
  },
  {
    label: 'Last month',
    value: 'last_month',
    from: new Date(2026, 1, 1),
    to: new Date(2026, 1, 28),
  },
]

export function DateRangePicker() {
  const setDateRange = useFilterStore((s) => s.setDateRange)
  const [selected, setSelected] = useState('30d')

  function handleChange(value: string | null) {
    if (!value) return
    setSelected(value)
    const preset = presets.find((p) => p.value === value)
    if (preset) {
      setDateRange(preset.from, preset.to)
    }
  }

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="h-9 w-full text-xs sm:w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {presets.map((preset) => (
          <SelectItem key={preset.value} value={preset.value}>
            {preset.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
