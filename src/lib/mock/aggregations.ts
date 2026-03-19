import type { Order, Product, ProductCategory, Unit } from '@/lib/schemas'
import type {
  DailyRevenue,
  DailyRevenueByUnit,
  HourlyOrders,
  ProductRanking,
  CategoryRevenue,
  UnitMetric,
  ChannelDistribution,
  DashboardKpis,
} from '@/types/dashboard'

export type {
  DailyRevenue,
  DailyRevenueByUnit,
  HourlyOrders,
  ProductRanking,
  CategoryRevenue,
  UnitMetric,
  ChannelDistribution,
  DashboardKpis,
}

// ---- Helper ----

function dateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function dayName(dayOfWeek: number): string {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
}

// ---- Compute functions ----

export function computeCompleted(orders: Order[]): Order[] {
  return orders.filter((o) => o.status === 'completed')
}

export function computeDailyRevenue(orders: Order[]): DailyRevenue[] {
  const completed = computeCompleted(orders)
  const map = new Map<string, { revenue: number; orders: number }>()

  for (const o of completed) {
    const key = dateKey(o.date)
    const entry = map.get(key) || { revenue: 0, orders: 0 }
    entry.revenue += o.total
    entry.orders += 1
    map.set(key, entry)
  }

  return Array.from(map.entries())
    .map(([date, data]) => ({
      date,
      revenue: Math.round(data.revenue * 100) / 100,
      orders: data.orders,
      avgTicket: Math.round((data.revenue / data.orders) * 100) / 100,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function computeDailyRevenueByUnit(orders: Order[]): DailyRevenueByUnit[] {
  const completed = computeCompleted(orders)
  const map = new Map<string, { revenue: number; orders: number; unitId: string; date: string }>()

  for (const o of completed) {
    const key = `${dateKey(o.date)}_${o.unitId}`
    const entry = map.get(key) || { revenue: 0, orders: 0, unitId: o.unitId, date: dateKey(o.date) }
    entry.revenue += o.total
    entry.orders += 1
    map.set(key, entry)
  }

  return Array.from(map.values())
    .map((d) => ({
      date: d.date,
      unitId: d.unitId,
      revenue: Math.round(d.revenue * 100) / 100,
      orders: d.orders,
      avgTicket: Math.round((d.revenue / d.orders) * 100) / 100,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function computeHourlyOrders(orders: Order[]): HourlyOrders[] {
  const completed = computeCompleted(orders)
  const hours = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    label: `${String(h).padStart(2, '0')}h`,
    orders: 0,
    revenue: 0,
  }))

  for (const o of completed) {
    const h = o.date.getHours()
    hours[h].orders += 1
    hours[h].revenue += o.total
  }

  hours.forEach((h) => {
    h.revenue = Math.round(h.revenue * 100) / 100
  })

  return hours
}

export function computeProductRankings(
  orders: Order[],
  productList: Product[],
  categoryList: ProductCategory[]
): ProductRanking[] {
  const completed = computeCompleted(orders)
  const map = new Map<string, { unitsSold: number; revenue: number }>()

  for (const o of completed) {
    for (const item of o.items) {
      const entry = map.get(item.productId) || { unitsSold: 0, revenue: 0 }
      entry.unitsSold += item.quantity
      entry.revenue += item.unitPrice * item.quantity
      map.set(item.productId, entry)
    }
  }

  const totalRevenue = Array.from(map.values()).reduce((s, e) => s + e.revenue, 0)

  const rankings = productList
    .filter((p) => map.has(p.id))
    .map((p) => {
      const data = map.get(p.id)!
      const cat = categoryList.find((c) => c.id === p.categoryId)
      return {
        rank: 0,
        productId: p.id,
        productName: p.name,
        categoryId: p.categoryId,
        categoryName: cat?.name || '',
        unitsSold: data.unitsSold,
        revenue: Math.round(data.revenue * 100) / 100,
        mixPercent: Math.round((data.revenue / totalRevenue) * 10000) / 100,
      }
    })
    .sort((a, b) => b.revenue - a.revenue)

  rankings.forEach((r, i) => {
    r.rank = i + 1
  })

  return rankings
}

export function computeCategoryRevenue(
  orders: Order[],
  productList: Product[],
  categoryList: ProductCategory[]
): CategoryRevenue[] {
  const completed = computeCompleted(orders)
  const productCategoryMap = new Map(productList.map((p) => [p.id, p.categoryId]))
  const map = new Map<string, { revenue: number; orders: Set<string> }>()

  for (const o of completed) {
    for (const item of o.items) {
      const catId = productCategoryMap.get(item.productId)
      if (!catId) continue
      const entry = map.get(catId) || { revenue: 0, orders: new Set<string>() }
      entry.revenue += item.unitPrice * item.quantity
      entry.orders.add(o.id)
      map.set(catId, entry)
    }
  }

  const totalRevenue = Array.from(map.values()).reduce((s, e) => s + e.revenue, 0)

  return categoryList
    .map((cat) => {
      const data = map.get(cat.id)
      return {
        categoryId: cat.id,
        categoryName: cat.name,
        color: cat.color,
        revenue: data ? Math.round(data.revenue * 100) / 100 : 0,
        orders: data ? data.orders.size : 0,
        percentage: data ? Math.round((data.revenue / totalRevenue) * 10000) / 100 : 0,
      }
    })
    .sort((a, b) => b.revenue - a.revenue)
}

export function computeUnitMetrics(orders: Order[], unitList: Unit[]): UnitMetric[] {
  const completed = computeCompleted(orders)

  // Split into current month and previous month for growth
  const now = new Date(2026, 2, 15) // reference date
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

  const unitMap = new Map<
    string,
    { revenue: number; orders: number; currentRev: number; prevRev: number }
  >()

  for (const o of completed) {
    const entry = unitMap.get(o.unitId) || { revenue: 0, orders: 0, currentRev: 0, prevRev: 0 }
    entry.revenue += o.total
    entry.orders += 1

    if (o.date >= currentMonthStart) {
      entry.currentRev += o.total
    } else if (o.date >= prevMonthStart && o.date <= prevMonthEnd) {
      entry.prevRev += o.total
    }

    unitMap.set(o.unitId, entry)
  }

  const metrics = unitList
    .map((u) => {
      const data = unitMap.get(u.id) || { revenue: 0, orders: 0, currentRev: 0, prevRev: 0 }
      const growth = data.prevRev > 0 ? ((data.currentRev - data.prevRev) / data.prevRev) * 100 : 0
      return {
        rank: 0,
        unitId: u.id,
        unitName: u.name,
        city: u.city,
        revenue: Math.round(data.revenue * 100) / 100,
        orders: data.orders,
        avgTicket: data.orders > 0 ? Math.round((data.revenue / data.orders) * 100) / 100 : 0,
        growthPercent: Math.round(growth * 10) / 10,
      }
    })
    .sort((a, b) => b.revenue - a.revenue)

  metrics.forEach((m, i) => {
    m.rank = i + 1
  })

  return metrics
}

export function computeChannelDistribution(orders: Order[]): ChannelDistribution[] {
  const completed = computeCompleted(orders)
  const labels: Record<string, string> = {
    dine_in: 'Dine-in',
    delivery: 'Delivery',
    takeout: 'Takeout',
  }

  const map = new Map<string, number>()
  for (const o of completed) {
    map.set(o.channel, (map.get(o.channel) || 0) + 1)
  }

  const total = completed.length

  return ['dine_in', 'delivery', 'takeout'].map((ch) => ({
    channel: ch,
    label: labels[ch],
    orders: map.get(ch) || 0,
    percentage: Math.round(((map.get(ch) || 0) / total) * 10000) / 100,
  }))
}

export function computeKpis(
  orders: Order[],
  productList: Product[],
  unitList: Unit[],
  categoryList: ProductCategory[]
): DashboardKpis {
  const completed = computeCompleted(orders)
  const cancelled = orders.filter((o) => o.status === 'cancelled')

  const totalRevenue = completed.reduce((s, o) => s + o.total, 0)
  const avgTicket = completed.length > 0 ? totalRevenue / completed.length : 0

  // Monthly revenue (current month: March 2026)
  const currentMonthOrders = completed.filter(
    (o) => o.date.getFullYear() === 2026 && o.date.getMonth() === 2
  )
  const monthlyRevenue = currentMonthOrders.reduce((s, o) => s + o.total, 0)

  // Best day by day-of-week average revenue
  const dayRevenues: Record<number, { total: number; count: number }> = {}
  const dailyMap = new Map<string, number>()
  for (const o of completed) {
    const key = dateKey(o.date)
    dailyMap.set(key, (dailyMap.get(key) || 0) + o.total)
  }
  for (const [key, rev] of dailyMap) {
    const date = new Date(key)
    const dow = date.getDay()
    if (!dayRevenues[dow]) dayRevenues[dow] = { total: 0, count: 0 }
    dayRevenues[dow].total += rev
    dayRevenues[dow].count += 1
  }

  let bestDow = 6 // Saturday default
  let bestDowAvg = 0
  for (const [dow, data] of Object.entries(dayRevenues)) {
    const avg = data.total / data.count
    if (avg > bestDowAvg) {
      bestDowAvg = avg
      bestDow = Number(dow)
    }
  }

  // Best single day revenue
  let bestDayRev = 0
  for (const rev of dailyMap.values()) {
    if (rev > bestDayRev) bestDayRev = rev
  }

  // Peak hour
  const hourlyOrders = computeHourlyOrders(orders)
  const peakHour = hourlyOrders.reduce(
    (max, h) => (h.orders > max.orders ? h : max),
    hourlyOrders[0]
  )

  // Avg prep time
  const avgPrep = completed.reduce((s, o) => s + o.prepTimeMinutes, 0) / completed.length

  // Total items for avg items per order
  const totalItems = completed.reduce(
    (s, o) => s + o.items.reduce((is, i) => is + i.quantity, 0),
    0
  )

  // Product rankings
  const rankings = computeProductRankings(orders, productList, categoryList)
  const topProduct = rankings[0]

  // Unit metrics
  const unitMetrics = computeUnitMetrics(orders, unitList)
  const bestUnit = unitMetrics[0]

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalOrders: orders.length,
    completedOrders: completed.length,
    cancelledOrders: cancelled.length,
    avgTicket: Math.round(avgTicket * 100) / 100,
    cancellationRate: Math.round((cancelled.length / orders.length) * 10000) / 100,
    monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    revenuePerUnit: Math.round((totalRevenue / unitList.length) * 100) / 100,
    bestDayRevenue: Math.round(bestDayRev * 100) / 100,
    bestDayName: dayName(bestDow),
    peakHour: `${String(peakHour.hour).padStart(2, '0')}:00–${String(peakHour.hour + 1).padStart(2, '0')}:00`,
    avgPrepTime: Math.round(avgPrep),
    activeProducts: productList.filter((p) => p.isActive).length,
    activeUnits: unitList.filter((u) => u.isActive).length,
    topProductName: topProduct?.productName || '',
    topProductRevenue: topProduct?.revenue || 0,
    avgItemsPerOrder: Math.round((totalItems / completed.length) * 10) / 10,
    bestUnitName: bestUnit?.unitName || '',
    bestUnitRevenue: bestUnit?.revenue || 0,
    avgRevenuePerUnit: Math.round((totalRevenue / unitList.length) * 100) / 100,
  }
}
