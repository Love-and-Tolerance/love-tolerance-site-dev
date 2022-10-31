import { z } from 'zod'

export type AssetsBaseRepo = z.infer<typeof AssetsBaseRepoSchema>
export type JavaAssetsAddonVariant = z.infer<typeof JavaAssetsAddonVariantSchema>
export type JavaAssetsAddon = z.infer<typeof JavaAssetsAddonSchema>
export type JavaAssets = z.infer<typeof JavaAssetsSchema>

export type BedrockAssetsAddon = z.infer<typeof BedrockAssetsAddonSchema>
export type BedrockAssets = z.infer<typeof BedrockAssetsSchema>

export const AssetsBaseRepoSchema = z.object({
  mc_versions: z.string(),
  pack_format: z.string(),
  tag: z.string(),
  release_url: z.string(),
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
    base: AssetsBaseRepoSchema,
    addons: z.array(JavaAssetsAddonSchema)
  })
})

export const BedrockAssetsAddonSchema = z.object({
  name: z.string(),
  filename: z.string(),
  url: z.string()
})

export const BedrockAssetsSchema = z.object({
  repos: z.object({
    base: AssetsBaseRepoSchema,
    addons: z.array(BedrockAssetsAddonSchema)
  })
})
