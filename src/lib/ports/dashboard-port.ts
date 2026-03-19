import type { Order } from '@/lib/schemas'
import type {
  DashboardKpis,
  DailyRevenue,
  DailyRevenueByUnit,
  HourlyOrders,
  ProductRanking,
  CategoryRevenue,
  UnitMetric,
  ChannelDistribution,
} from '@/types/dashboard'

export interface DashboardFilters {
  dateRange: { from: Date; to: Date }
  selectedUnitId: string | null
  selectedCategoryId: string | null
}

export interface DashboardData {
  filteredOrders: Order[]
  completedOrders: Order[]
  kpis: DashboardKpis
  dailyRevenue: DailyRevenue[]
  dailyRevenueByUnit: DailyRevenueByUnit[]
  hourlyOrders: HourlyOrders[]
  productRankings: ProductRanking[]
  categoryRevenue: CategoryRevenue[]
  unitMetrics: UnitMetric[]
  allUnitMetrics: UnitMetric[]
  channelDistribution: ChannelDistribution[]
  previousDailyRevenue: DailyRevenue[]
  unitNameMap: Map<string, string>
}

export interface DashboardPort {
  getData(filters: DashboardFilters): DashboardData
}
