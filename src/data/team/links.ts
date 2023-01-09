export interface ContactLink {
  id: string;
  icon: string;
  title: string;
  url?: string;
}

export const ContactLinks: ContactLink[] = [
  {
    id: "email",
    icon: "fas fa-envelope",
    title: "E-Mail",
    url: "mailto:%s",
  },
  {
    id: "github",
    icon: "fab fa-github",
    title: "GitHub",
    url: "https://github.com/%s",
  },
  {
    id: "twitter",
    icon: "fab fa-twitter",
    title: "Twitter",
    url: "https://twitter.com/%s",
  },
  {
    id: "vk",
    icon: "fab fa-vk",
    title: "VK",
    url: "https://vk.com/%s",
  },
  {
    id: "discord",
    icon: "fab fa-discord",
    title: "Discord tag",
  },
];
