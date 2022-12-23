import { ConditionalLicense, ExclusiveAddonVariant } from "../java/schemas";
import { isTriggerred } from "./trigger";

export function getLicense(selectedVariants: ExclusiveAddonVariant[], license: ConditionalLicense | undefined): string | undefined {
  if (Array.isArray(license)) {
    for (const condition of license) {
      if (condition.trigger === "DEFAULT" || isTriggerred(selectedVariants, condition.trigger)) {
        return typeof condition.value === "string" ? condition.value : undefined;
      }
    }
  }

  return undefined;
}
