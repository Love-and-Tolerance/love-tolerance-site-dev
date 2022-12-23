import { ConditionalBranch, ExclusiveAddonVariant } from "../java/schemas";
import { isTriggerred } from "./trigger";

export function getBranch(selectedVariants: ExclusiveAddonVariant[], branch: ConditionalBranch | undefined): string {
  if (typeof branch === "string") {
    return branch;
  } else if (Array.isArray(branch)) {
    for (const condition of branch) {
      if (condition.trigger === "DEFAULT" || isTriggerred(selectedVariants, condition.trigger)) {
        return condition.value;
      }
    }
  }

  return "HEAD";
}
