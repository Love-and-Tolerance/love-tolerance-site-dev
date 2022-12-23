import { z } from "zod";

export type JavaAssets = z.infer<typeof JavaAssetsSchema>;
export type JavaBaseRepo = z.infer<typeof JavaBaseRepoSchema>;
export type ExclusiveAddonRaw = z.infer<typeof ExclusiveAddonSchema>;
export type RegularAddonRaw = z.infer<typeof RegularAddonSchema>;
export type ModAddonRaw = z.infer<typeof ModAddonSchema>;
export type ExclusiveAddonVariant = z.infer<typeof ExclusiveAddonVariantSchema>;
export type ConditionalBranch = z.infer<typeof ConditionalBranchSchema>;
export type ConditionalLicense = z.infer<typeof ConditionalLicenseSchema>;

const JavaBaseRepoSchema = z.object({
  mc_versions: z.string(),
  pack_format: z.string(),
  version: z.string(),
  url: z.string(),
});

const ConditionalBranchSchema = z.union([
  z.string(),
  z
    .object({
      trigger: z.string(),
      value: z.string(),
    })
    .array(),
]);

const ConditionalLicenseSchema = z.union([
  z.boolean(),
  z
    .object({
      trigger: z.string(),
      value: z.union([z.boolean(), z.string()]),
    })
    .array(),
]);

const ExclusiveAddonVariantSchema = z.object({
  name: z.string(),
  id: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  branch: ConditionalBranchSchema.optional(),
  trigger: z.string().optional(),
});

const ExclusiveAddonSchema = z.object({
  name: z.string(),
  id_pos: z.number(),
  apply_order: z.number(),
  default_variant: z.string(),
  variants: ExclusiveAddonVariantSchema.array(),
  license: ConditionalLicenseSchema.optional(),
});

const RegularAddonSchema = z.object({
  name: z.string(),
  id: z.string(),
  default_enabled: z.boolean(),
  required_mods: z.string().array().optional(),
  minimum_minecraft_version: z.string().optional(),
  url: z.string(),
  branch: ConditionalBranchSchema.optional(),
  license: ConditionalLicenseSchema.optional(),
});

const ModAddonSchema = z.object({
  name: z.string(),
  id: z.string(),
  default_enabled: z.boolean(),
  modloader: z.union([z.string(), z.string().array()]),
  url: z.string(),
  links: z
    .object({
      name: z.string(),
      url: z.string(),
    })
    .array(),
});

export const JavaAssetsSchema = z.object({
  templates: z.object({
    zips_path: z.string(),
    base_zip_name: z.string(),
    exclusive_addon_zip_name: z.string(),
    regular_addon_zip_name: z.string(),
    mod_addon_zip_name: z.string(),
    filename: z.string(),
  }),
  repos: z.object({
    base: JavaBaseRepoSchema,
    addons: z.object({
      exclusive: ExclusiveAddonSchema.array(),
      regular: RegularAddonSchema.array(),
      mods: ModAddonSchema.array(),
    }),
  }),
});
