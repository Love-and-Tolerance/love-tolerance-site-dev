import { ConditionalLicense } from "../java/schemas/assets";

export function getLicense(triggers: string[], license: ConditionalLicense | undefined): string | undefined {
  if (Array.isArray(license)) {
    for (const condition of license) {
      if (condition.trigger === "DEFAULT" || triggers.includes(condition.trigger)) {
        return typeof condition.value === "string" ? condition.value : undefined;
      }
    }
  }

  return undefined;
}
