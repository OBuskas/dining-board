import { orders as allOrders, units, products, categories } from '@/lib/mock'
import {
  computeKpis,
  computeDailyRevenue,
  computeDailyRevenueByUnit,
  computeHourlyOrders,
  computeProductRankings,
  computeCategoryRevenue,
  computeUnitMetrics,
  computeChannelDistribution,
  computeCompleted,
} from '@/lib/mock/aggregations'
import type { DashboardPort, DashboardFilters, DashboardData } from '@/lib/ports/dashboard-port'

class MockDashboardAdapter implements DashboardPort {
  getData(filters: DashboardFilters): DashboardData {
    const { dateRange, selectedUnitId, selectedCategoryId } = filters

    // Filter orders by date range and unit
    const filteredOrders = allOrders.filter((o) => {
      const inRange = o.date >= dateRange.from && o.date <= dateRange.to
      const inUnit = !selectedUnitId || o.unitId === selectedUnitId
      return inRange && inUnit
    })

    const completedOrders = computeCompleted(filteredOrders)
    const kpis = computeKpis(filteredOrders, products, units, categories)
    const dailyRevenue = computeDailyRevenue(filteredOrders)
    const dailyRevenueByUnit = computeDailyRevenueByUnit(filteredOrders)
    const hourlyOrders = computeHourlyOrders(filteredOrders)

    // Product rankings with optional category filter
    let ordersForProducts = filteredOrders
    if (selectedCategoryId) {
      const categoryProductIds = new Set(
        products.filter((p) => p.categoryId === selectedCategoryId).map((p) => p.id)
      )
      ordersForProducts = filteredOrders.filter((o) =>
        o.items.some((i) => categoryProductIds.has(i.productId))
      )
    }
    const productRankings = computeProductRankings(ordersForProducts, products, categories)

    const categoryRevenue = computeCategoryRevenue(filteredOrders, products, categories)

    // Unit metrics — filter out zero-order units when a specific unit is selected
    const filteredUnitMetrics = computeUnitMetrics(filteredOrders, units)
    const unitMetrics = selectedUnitId
      ? filteredUnitMetrics.filter((m) => m.orders > 0)
      : filteredUnitMetrics

    // All unit metrics (unfiltered) for comparison charts
    const allDateOrders = allOrders.filter(
      (o) => o.date >= dateRange.from && o.date <= dateRange.to
    )
    const allUnitMetrics = selectedUnitId
      ? computeUnitMetrics(allDateOrders, units)
      : filteredUnitMetrics

    const channelDistribution = computeChannelDistribution(filteredOrders)

    // Previous period for comparison (same duration, preceding the current range)
    const duration = dateRange.to.getTime() - dateRange.from.getTime()
    const prevFrom = new Date(dateRange.from.getTime() - duration)
    const prevTo = new Date(dateRange.from.getTime() - 1)
    const previousPeriodOrders = allOrders.filter((o) => {
      const inRange = o.date >= prevFrom && o.date <= prevTo
      const inUnit = !selectedUnitId || o.unitId === selectedUnitId
      return inRange && inUnit
    })
    const previousDailyRevenue = computeDailyRevenue(previousPeriodOrders)

    const unitNameMap = new Map(units.map((u) => [u.id, u.name]))

    return {
      filteredOrders,
      completedOrders,
      kpis,
      dailyRevenue,
      dailyRevenueByUnit,
      hourlyOrders,
      productRankings,
      categoryRevenue,
      unitMetrics,
      allUnitMetrics,
      channelDistribution,
      previousDailyRevenue,
      unitNameMap,
    }
  }
}

export const mockAdapter: DashboardPort = new MockDashboardAdapter()
