import { z } from 'zod'

export type PingResult = z.infer<typeof PingResultSchema>

export const PingResultSchema = z.union([
  z.object({
    online: z.literal(false)
  }),
  z.object({
    online: z.literal(true),
    version: z.string(),
    players: z.object({
      online: z.number(),
      max: z.number()
    })
  })
])
