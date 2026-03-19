import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function formatUSD(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function formatCompactUSD(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`
  return formatUSD(value)
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatDate(date: Date, pattern: string = 'MM/dd/yyyy'): string {
  return format(date, pattern, { locale: enUS })
}

export function formatShortDate(date: Date): string {
  return format(date, 'MM/dd', { locale: enUS })
}
