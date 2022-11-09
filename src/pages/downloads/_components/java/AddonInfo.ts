import { RawAddon } from "./schemas";
import { VariantInfo } from "./VariantInfo";

export class AddonInfo {
  public readonly name: string;
  public readonly idPos: number;

  public readonly defaultVariant: VariantInfo;

  public readonly variants = new Map<string, VariantInfo>();

  constructor(raw: RawAddon) {
    this.name = raw.name;
    this.idPos = raw.id_pos;

    for (const rawVariant of raw.variants) {
      const variant = new VariantInfo(rawVariant);

      this.variants.set(variant.id, variant);
    }

    this.defaultVariant = this.getVariant(raw.default);
  }

  public getVariant(id: string): VariantInfo {
    const variant = this.variants.get(id);

    if (variant === undefined) {
      throw new Error(`Variant id "${id}" is not registered`);
    }

    return variant;
  }
}
