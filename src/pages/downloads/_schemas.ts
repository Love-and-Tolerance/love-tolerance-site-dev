import { z } from 'zod'

export type JavaAssetsBaseRepo = z.infer<typeof JavaAssetsBaseRepoSchema>
export type JavaAssetsAddonVariant = z.infer<typeof JavaAssetsAddonVariantSchema>
export type JavaAssetsAddon = z.infer<typeof JavaAssetsAddonSchema>
export type JavaAssets = z.infer<typeof JavaAssetsSchema>

export const JavaAssetsBaseRepoSchema = z.object({
  mc_versions: z.number(),
  pack_format: z.number(),
  version: z.string(),
  filename: z.string(),
  url: z.string()
})

export const JavaAssetsAddonVariantSchema = z.object({
  name: z.string(),
  id: z.string(),
  branch: z.optional(z.string()),
  url: z.optional(z.string()),
  'pack.png': z.optional(z.string()),
  description: z.optional(z.string())
})

export const JavaAssetsAddonSchema = z.object({
  name: z.string(),
  id_pos: z.number(),
  default: z.string(),
  variants: z.array(JavaAssetsAddonVariantSchema)
})

export const JavaAssetsSchema = z.object({
  repos: z.object({
    base: JavaAssetsBaseRepoSchema,
    addons: z.array(JavaAssetsAddonSchema)
  })
})
