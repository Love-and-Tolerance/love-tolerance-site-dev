import { z } from "zod";

export type BedrockAssets = z.infer<typeof BedrockAssetsSchema>;
export type BedrockBaseRepo = z.infer<typeof BedrockBaseRepoSchema>;
export type BedrockAddon = z.infer<typeof BedrockAddonSchema>;

const BedrockBaseRepoSchema = z.object({
  mc_versions: z.string(),
  pack_format: z.string(),
  tag: z.string(),
  version: z.string(),
  filename: z.string(),
  url: z.string(),
});

const BedrockAddonSchema = z.object({
  name: z.string(),
  filename: z.string(),
  url: z.string(),
});

export const BedrockAssetsSchema = z.object({
  templates: z.object({
    asset_url: z.string(),
  }),
  repos: z.object({
    base: BedrockBaseRepoSchema,
    addons: BedrockAddonSchema.array(),
  }),
});
