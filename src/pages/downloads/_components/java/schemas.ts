import { z } from "zod";
import { BaseRepoSchema } from "../schemas";

export interface RawVariant extends z.infer<typeof VariantSchema> {}
export interface RawAddon extends z.infer<typeof AddonSchema> {}
export interface RawAssets extends z.infer<typeof AssetsSchema> {}

export const VariantSchema = z.object({
  name: z.string(),
  id: z.string(),
  branch: z.optional(z.string()),
  url: z.optional(z.string()),
  "pack.png": z.optional(z.string()),
  description: z.optional(z.string()),
});

export const AddonSchema = z.object({
  name: z.string(),
  id_pos: z.number(),
  default: z.string(),
  variants: z.array(VariantSchema),
});

export const AssetsSchema = z.object({
  repos: z.object({
    base: BaseRepoSchema,
    addons: z.array(AddonSchema),
  }),
});
