import { z } from 'zod'

export const UnitSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
})

export type Unit = z.infer<typeof UnitSchema>
