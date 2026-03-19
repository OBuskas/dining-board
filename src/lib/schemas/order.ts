import { z } from 'zod'

export const OrderChannelSchema = z.enum(['dine_in', 'delivery', 'takeout'])
export type OrderChannel = z.infer<typeof OrderChannelSchema>

export const OrderStatusSchema = z.enum(['completed', 'cancelled', 'in_progress'])
export type OrderStatus = z.infer<typeof OrderStatusSchema>

export const OrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
})

export type OrderItem = z.infer<typeof OrderItemSchema>

export const OrderSchema = z.object({
  id: z.string(),
  unitId: z.string(),
  date: z.date(),
  channel: OrderChannelSchema,
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema),
  total: z.number(),
  prepTimeMinutes: z.number(),
})

export type Order = z.infer<typeof OrderSchema>
