// ---- Dashboard aggregation types ----
// These types define the shape of computed/aggregated data consumed by the dashboard.
// They are independent of the data source (mock, API, etc).

export interface DailyRevenue {
  date: string // YYYY-MM-DD
  revenue: number
  orders: number
  avgTicket: number
}

export interface DailyRevenueByUnit extends DailyRevenue {
  unitId: string
}

export interface HourlyOrders {
  hour: number
  label: string
  orders: number
  revenue: number
}

export interface ProductRanking {
  rank: number
  productId: string
  productName: string
  categoryId: string
  categoryName: string
  unitsSold: number
  revenue: number
  mixPercent: number
}

export interface CategoryRevenue {
  categoryId: string
  categoryName: string
  color: string
  revenue: number
  orders: number
  percentage: number
}

export interface UnitMetric {
  rank: number
  unitId: string
  unitName: string
  city: string
  revenue: number
  orders: number
  avgTicket: number
  growthPercent: number
}

export interface ChannelDistribution {
  channel: string
  label: string
  orders: number
  percentage: number
}

export interface DashboardKpis {
  totalRevenue: number
  totalOrders: number
  completedOrders: number
  cancelledOrders: number
  avgTicket: number
  cancellationRate: number
  monthlyRevenue: number
  revenuePerUnit: number
  bestDayRevenue: number
  bestDayName: string
  peakHour: string
  avgPrepTime: number
  activeProducts: number
  activeUnits: number
  topProductName: string
  topProductRevenue: number
  avgItemsPerOrder: number
  bestUnitName: string
  bestUnitRevenue: number
  avgRevenuePerUnit: number
}
