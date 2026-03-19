import { units } from './units'
import { categories, products } from './products'
import { generateOrders } from './orders'
import {
  computeKpis,
  computeDailyRevenue,
  computeDailyRevenueByUnit,
  computeHourlyOrders,
  computeProductRankings,
  computeCategoryRevenue,
  computeUnitMetrics,
  computeChannelDistribution,
} from './aggregations'

// Generate all orders once (deterministic via seeded PRNG)
const orders = generateOrders()

// Pre-compute all aggregations
const kpis = computeKpis(orders, products, units, categories)
const dailyRevenue = computeDailyRevenue(orders)
const dailyRevenueByUnit = computeDailyRevenueByUnit(orders)
const hourlyOrders = computeHourlyOrders(orders)
const productRankings = computeProductRankings(orders, products, categories)
const categoryRevenue = computeCategoryRevenue(orders, products, categories)
const unitMetrics = computeUnitMetrics(orders, units)
const channelDistribution = computeChannelDistribution(orders)

export {
  units,
  categories,
  products,
  orders,
  kpis,
  dailyRevenue,
  dailyRevenueByUnit,
  hourlyOrders,
  productRankings,
  categoryRevenue,
  unitMetrics,
  channelDistribution,
}

export type {
  DailyRevenue,
  DailyRevenueByUnit,
  HourlyOrders,
  ProductRanking,
  CategoryRevenue,
  UnitMetric,
  ChannelDistribution,
  DashboardKpis,
} from '@/types/dashboard'
