import { ExclusiveAddonVariant } from "../java/schemas/assets";

export function isTriggerred(selectedVariants: ExclusiveAddonVariant[], trigger: string): boolean {
  const triggerVariant = selectedVariants.find((variant) => variant.trigger === trigger);

  return triggerVariant !== undefined;
}
