import type { Order, OrderChannel, OrderItem, OrderStatus } from '@/lib/schemas'
import { random, randomInt, randomNormal, weightedPick } from './seed'
import { units, unitWeights } from './units'
import { products, productWeights } from './products'

// 90-day period: Dec 16 2025 → Mar 15 2026
const START_DATE = new Date(2025, 11, 16) // month is 0-indexed
const END_DATE = new Date(2026, 2, 15)

const CHANNELS: OrderChannel[] = ['dine_in', 'delivery', 'takeout']
const CHANNEL_WEIGHTS = [0.45, 0.35, 0.2]

// Hour distribution weights (bimodal: lunch 11-14, dinner 18-22)
const HOUR_WEIGHTS: number[] = [
  0.002,
  0.001,
  0.001,
  0.001,
  0.002,
  0.005, // 0-5h
  0.015,
  0.025,
  0.03,
  0.035,
  0.045,
  0.08, // 6-11h
  0.11,
  0.09,
  0.06,
  0.04,
  0.03,
  0.04, // 12-17h
  0.065,
  0.09,
  0.085,
  0.07,
  0.045,
  0.028, // 18-23h
]

function getDayOfWeek(date: Date): number {
  return date.getDay() // 0=Sun, 6=Sat
}

function getDayMultiplier(date: Date): number {
  const dow = getDayOfWeek(date)
  // Sat is best, Fri & Sun also above average
  const multipliers = [1.05, 0.85, 0.9, 0.92, 0.95, 1.12, 1.2]
  return multipliers[dow]
}

function generateOrderItems(): OrderItem[] {
  // Average 3.2 items per order
  const numItems = Math.max(1, Math.round(randomNormal(3.2, 1.2, 1, 7)))
  const items: OrderItem[] = []
  const usedProducts = new Set<string>()

  for (let i = 0; i < numItems; i++) {
    let product = weightedPick(products, productWeights)

    // Avoid duplicate products in same order
    let attempts = 0
    while (usedProducts.has(product.id) && attempts < 10) {
      product = weightedPick(products, productWeights)
      attempts++
    }
    usedProducts.add(product.id)

    const quantity = random() < 0.15 ? 2 : 1 // 15% chance of qty 2

    items.push({
      productId: product.id,
      quantity,
      unitPrice: product.price,
    })
  }

  return items
}

export function generateOrders(): Order[] {
  const orders: Order[] = []
  let orderId = 1

  const currentDate = new Date(START_DATE)

  while (currentDate <= END_DATE) {
    const dayMultiplier = getDayMultiplier(currentDate)
    // Target ~205 orders/day average → ~18,450 over 90 days
    const baseOrders = Math.round(205 * dayMultiplier)
    const dayOrders = baseOrders + randomInt(-10, 10)

    for (let i = 0; i < dayOrders; i++) {
      // Pick hour based on distribution
      const hours = Array.from({ length: 24 }, (_, h) => h)
      const hour = weightedPick(hours, HOUR_WEIGHTS)
      const minute = randomInt(0, 59)

      const orderDate = new Date(currentDate)
      orderDate.setHours(hour, minute, randomInt(0, 59))

      const unit = weightedPick(units, unitWeights)
      const channel = weightedPick(CHANNELS, CHANNEL_WEIGHTS)
      const items = generateOrderItems()

      const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
      const roundedTotal = Math.round(total * 100) / 100

      // Status: ~3.2% cancelled, ~0.5% in_progress (only on last 2 days)
      let status: OrderStatus = 'completed'
      const r = random()
      const isRecentDay = currentDate.getTime() > END_DATE.getTime() - 2 * 24 * 60 * 60 * 1000
      if (r < 0.032) {
        status = 'cancelled'
      } else if (isRecentDay && r < 0.04) {
        status = 'in_progress'
      }

      const prepTime = Math.round(randomNormal(18, 5, 8, 40))

      orders.push({
        id: `ORD-${String(orderId).padStart(6, '0')}`,
        unitId: unit.id,
        date: orderDate,
        channel,
        status,
        items,
        total: roundedTotal,
        prepTimeMinutes: prepTime,
      })

      orderId++
    }

    // Advance to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return orders
}
