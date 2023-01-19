import { z } from "zod";

export type JavaAssets = z.infer<typeof JavaAssetsSchema>;
export type JavaBaseRepo = z.infer<typeof JavaBaseRepoSchema>;
export type VariantAddonRaw = z.infer<typeof VariantAddonSchema>;
export type VariantRaw = z.infer<typeof VariantSchema>;
export type BasicAddonRaw = z.infer<typeof BasicAddonSchema>;
export type ConditionalBranch = z.infer<typeof ConditionalBranchSchema>;
export type ConditionalLicense = z.infer<typeof ConditionalLicenseSchema>;
export type AddonLink = z.infer<typeof AddonLinkSchema>;

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

const AddonLinkSchema = z.object({
  name: z.string(),
  url: z.string().or(
    z
      .object({
        name: z.string(),
        value: z.string(),
      })
      .array()
  ),
});

const VariantSchema = z.object({
  name: z.string(),
  id: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  branch: ConditionalBranchSchema.optional(),
  trigger: z.string().optional(),
});

const VariantAddonSchema = z.object({
  name: z.string(),
  id_pos: z.number(),
  apply_order: z.number(),
  default_variant: z.string(),
  variants: VariantSchema.array(),
  license: ConditionalLicenseSchema.optional(),
});

const BasicAddonSchema = z.object({
  id: z.string(),
  name: z.string(),
  recommended: z.boolean(),
  url: z.string(),
  description: z.string().optional(),

  info: z.string().array().optional(),
  links: AddonLinkSchema.array().optional(),

  branch: ConditionalBranchSchema.optional(),
  license: ConditionalLicenseSchema.optional(),
});

export const JavaAssetsSchema = z.object({
  templates: z.object({
    zips_path: z.string(),
    base_zip_name: z.string(),
    variant_addon_zip_name: z.string(),
    regular_addon_zip_name: z.string(),
    mod_addon_zip_name: z.string(),
    filename: z.string(),
  }),
  repos: z.object({
    base: JavaBaseRepoSchema,
    addons: z.object({
      exclusive: VariantAddonSchema.array(),
      regular: BasicAddonSchema.array(),
      mods: BasicAddonSchema.array(),
    }),
  }),
});
