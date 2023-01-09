export interface ContactCard {
  name: string;
  role: string;
  nickname?: string;
  avatar: string;
  social?: {
    email?: string;
    github?: string;
    twitter?: string;
    vk?: string;
    discord?: string;
  };
}

export interface ContactCardsInfo {
  name: string;
  type: "contact";
  cards: ContactCard[];
}
