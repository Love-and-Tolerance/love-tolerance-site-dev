import { ConditionalBranch } from "../java/schemas/assets";

export function getBranch(triggers: string[], branch: ConditionalBranch | undefined): string {
  if (typeof branch === "string") {
    return branch;
  } else if (Array.isArray(branch)) {
    for (const condition of branch) {
      if (condition.trigger === "DEFAULT" || triggers.includes(condition.trigger)) {
        return condition.value;
      }
    }
  }

  return "HEAD";
}
