export interface NormalCard {
  image: string
  title: string
  content: string
}

export interface ContactCard {
  name: string
  role: string
  nickname?: string
  avatar: string
  social?: {
    email?: string
    github?: string
    twitter?: string
    vk?: string
    discord?: string
  }
}

export interface NormalCardsInfo {
  name: string
  type: 'normal'
  cards: NormalCard[]
}

export interface ContactCardsInfo {
  name: string
  type: 'contact'
  cards: ContactCard[]
}
