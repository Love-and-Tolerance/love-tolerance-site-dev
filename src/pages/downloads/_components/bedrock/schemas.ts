import { z } from "zod";
import { BaseRepoSchema } from "../schemas";

export interface RawAddon extends z.infer<typeof AddonSchema> {}
export interface RawAssets extends z.infer<typeof AssetsSchema> {}

export const AddonSchema = z.object({
  name: z.string(),
  filename: z.string(),
  url: z.string(),
});

export const AssetsSchema = z.object({
  repos: z.object({
    base: BaseRepoSchema,
    addons: z.array(AddonSchema),
  }),
});
