import { z } from "zod";

export interface RawBaseRepo extends z.infer<typeof BaseRepoSchema> {}

export const BaseRepoSchema = z.object({
  mc_versions: z.string(),
  pack_format: z.string(),
  tag: z.string(),
  release_url: z.string(),
  version: z.string(),
  filename: z.string(),
  url: z.string(),
});
