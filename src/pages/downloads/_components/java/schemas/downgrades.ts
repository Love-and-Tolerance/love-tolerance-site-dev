import { z } from "zod";

export type RawDowngradeLang = z.infer<typeof DowngradeLangSchema>;
export type RawDowngrades = z.infer<typeof DowngradesSchema>;
export type RawFormatDowngrade = z.infer<typeof FormatDowngradeSchema>;

export const DowngradeLangSchema = z.object({
  extends: z.string().optional(),
  set: z.record(z.string()).optional(),
  remove: z.string().array().optional(),
});

export const MoveSchema = z.object({
  from: z.union([z.string(), z.string().array()]),
  to: z.string(),
});

export const FormatDowngradeSchema = z.object({
  extends: z.string().optional(),
  langs: z.record(DowngradeLangSchema).optional(),
  files: z
    .object({
      copy: z.boolean().optional(),
      move: MoveSchema.array().optional(),
      remove: z.string().array().optional(),
    })
    .optional(),
});

export const DowngradesSchema = z.object({
  templates: z.object({
    format_name: z.string(),
    format_path: z.string(),
    zips_path: z.string(),
  }),
  pack_formats: z.object({
    versions: z.string().array(),
  }),
  version_names: z.record(z.string()),
});
