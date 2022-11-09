export interface VariantInfo {
  id: string;
  url: string | undefined;
  description: string | undefined;
  image: string | undefined;
}

export interface AddonInfo {
  pos: number;
  variant: string;
}

export interface VariantEvents {
  info: VariantInfo;
  click: VariantInfo;
}

export interface AddonEvents {
  variant: AddonInfo;
}
