export interface VariantInfo {
  id: string
  repo: string | null
  description: string | null
  image: string | null
}

export interface AddonInfo {
  pos: number
  variant: string
}

export interface VariantEvents {
  info: VariantInfo
  click: VariantInfo
}

export interface AddonEvents {
  variant: AddonInfo
}
