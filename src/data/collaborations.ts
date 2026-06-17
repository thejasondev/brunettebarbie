export interface Collaboration {
  name: string;
  handle: string;
  duration: string;
  years: number;
  description: string;
  category: string;
  url: string;
  logo: string;
}

export const collaborations: Collaboration[] = [
  {
    name: "Fashion Nova",
    handle: "@fashionnova",
    duration: "8 Years",
    years: 8,
    description: "Long-term brand ambassador creating fashion-forward content across seasonal campaigns, new launches, and lifestyle collections.",
    category: "Fashion",
    url: "https://www.fashionnova.com",
    logo: "/logo-collab/fashionnova.webp",
  },
  {
    name: "Pretty Little Thing",
    handle: "@prettylittlething",
    duration: "6 Years",
    years: 6,
    description: "Ongoing partnership featuring trend-driven looks, exclusive drops, and styled editorial content for a global fashion audience.",
    category: "Fashion",
    url: "https://www.prettylittlething.com",
    logo: "/logo-collab/plt.webp",
  },
  {
    name: "Bang Energy",
    handle: "@bangenergy",
    duration: "4 Years",
    years: 4,
    description: "Brand ambassador representing an active, energetic lifestyle through dynamic content creation and event appearances.",
    category: "Lifestyle",
    url: "https://www.bangenergy.com",
    logo: "/logo-collab/bang.webp",
  },
  {
    name: "WOW Skin Science",
    handle: "@wowskinscience",
    duration: "4 Years",
    years: 4,
    description: "Trusted partner showcasing premium skincare routines and product integrations for the U.S. market with authentic, results-driven content.",
    category: "Beauty & Skincare",
    url: "https://www.wowskinscience.com",
    logo: "/logo-collab/wowskinscience.webp",
  },
  {
    name: "Vagy Rejuvenation",
    handle: "@vagyrejuvenation",
    duration: "3 Years",
    years: 3,
    description: "Wellness brand collaboration focused on empowering women through self-care narratives and genuine product advocacy.",
    category: "Wellness",
    url: "https://www.vagyrejuvenation.com",
    logo: "/logo-collab/vagy.webp",
  },
  {
    name: "RYZE Superfoods",
    handle: "@ryzesuperfoods",
    duration: "2 Years",
    years: 2,
    description: "Health-conscious partnership creating engaging content around mushroom coffee and daily wellness rituals.",
    category: "Wellness",
    url: "https://www.rfryzesuperfoods.com",
    logo: "/logo-collab/ryze.webp",
  },
  {
    name: "Bliss",
    handle: "@bliss",
    duration: "2 Years",
    years: 2,
    description: "Skincare collaboration highlighting clean beauty products through lifestyle-integrated, approachable content.",
    category: "Beauty & Skincare",
    url: "https://www.blissworld.com",
    logo: "/logo-collab/bliss.webp",
  },
  {
    name: "Miami Swim Week",
    handle: "@miamiswimweekshows",
    duration: "2024 & 2025",
    years: 2,
    description: "Featured in runway shows and brand activations, collaborating indirectly with multiple swimwear and fashion labels during the event.",
    category: "Fashion Events",
    url: "https://www.miamiswimweek.com",
    logo: "/logo-collab/miamiswinweek.webp",
  },
];

export interface Stat {
  countTo: number;
  suffix: string;
  prefix: string;
  label: string;
  icon: string;
}

export const stats: Stat[] = [
  { countTo: 500, suffix: "K+", prefix: "", label: "Followers", icon: "community" },
  { countTo: 8, suffix: "+", prefix: "", label: "Brand Partnerships", icon: "handshake" },
  { countTo: 8, suffix: "+", prefix: "", label: "Years of Experience", icon: "calendar" },
  { countTo: 0, suffix: "", prefix: "Global", label: "Audience Reach", icon: "globe" },
];
