import { z } from 'zod'

export const ProductCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
})

export type ProductCategory = z.infer<typeof ProductCategorySchema>

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
  price: z.number().positive(),
  isActive: z.boolean(),
})

export type Product = z.infer<typeof ProductSchema>
