export interface TeamMember {
  name: string;
  role: string;
  nickname?: string;
  avatar: string;
  contacts: Record<string, string>;
}

export const TeamMembers: TeamMember[] = [
  {
    name: "Silk Rose",
    role: "Project Lead / Primary Texture Artist",
    nickname: "Silk_Rose",
    avatar: "/team/silk-rose.png",
    contacts: {
      email: "silkrose@love-tolerance.com",
      github: "SilkRose",
      discord: "Silk Rose#8880",
    },
  },
  {
    name: "Autumn Meadow",
    role: "Website Maintenance / General Texture Artist",
    nickname: "autumnblazey",
    avatar: "/team/pcelestia.png",
    contacts: {
      email: "blazeykirin@gmail.com",
      github: "autumnblazey",
      twitter: "autumnblazey",
      discord: "Autumn Meadow#2864",
    },
  },
  {
    name: "ZeldaLink / SolisLink",
    role: "Models / Texture Artist",
    avatar: "/team/solislink.png",
    contacts: {
      email: "zeldalinkaaron@gmail.com",
      discord: "SolisLink#7918",
    },
  },
  {
    name: "Bronydog",
    role: "Models / Texture Artist",
    avatar: "/team/bronydog.png",
    contacts: {
      discord: "bronydog#1620",
      email: "bronydog@love-tolerance.com",
    },
  },
  {
    name: "Vivian",
    role: "CTM Manager / Pack Maintenance",
    avatar: "/team/vivian.png",
    contacts: {
      email: "vivian@love-tolerance.com",
      discord: "Vivian Iolani#1337",
    },
  },
  {
    name: "Thunder Kick",
    role: "Texture Artist",
    avatar: "/team/thunder-kick.png",
    contacts: {
      discord: "Thunder_Kick#0195",
    },
  },
  {
    name: "Sollace",
    role: "GitHub Manager / Pack Maintenance",
    nickname: "Sollace",
    avatar: "/team/sollace.png",
    contacts: {
      github: "Sollace",
      twitter: "SollaceTheBeard",
      discord: "Sollace#3780",
    },
  },
  {
    name: "SkyArrow",
    role: "Website Maintenance",
    nickname: "__SkyArrow__",
    avatar: "/team/skyarrow.png",
    contacts: {
      email: "skyarrow25@gmail.com",
      discord: "SkyArrow#9143",
    },
  },
  {
    name: "Vayandas",
    role: "Texture Artist",
    nickname: "Vayandas",
    avatar: "/team/vayandas.png",
    contacts: {
      github: "vayandas",
      twitter: "vayandas",
      discord: "Vayandas#4275",
    },
  },
  {
    name: "Ivan Sokolov",
    role: "Website Maintenance",
    nickname: "Keupoz",
    avatar: "/team/keupoz.jpeg",
    contacts: {
      github: "keupoz",
      twitter: "keupoz",
      vk: "keupoz",
      discord: "Keupoz#9578",
    },
  },
];
