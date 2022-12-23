import { ExclusiveAddonRaw, ExclusiveAddonVariant } from "../java/schemas";

export function getVariant(addon: ExclusiveAddonRaw, id: string): ExclusiveAddonVariant {
  const variant = addon.variants.find((variant) => {
    return variant.id === id;
  });

  if (variant === undefined) {
    throw new Error(`No variant with id "${id}" in addon "${addon.name}"`);
  }

  return variant;
}
