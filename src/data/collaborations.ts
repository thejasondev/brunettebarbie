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
    name: "Saint Laurent",
    handle: "@ysl",
    duration: "2 Years",
    years: 2,
    description: "Luxury fashion partnership showcasing iconic pieces through high-end editorial content and exclusive brand experiences.",
    category: "Fashion",
    url: "https://www.ysl.com",
    logo: "/logo-collab/ysl.webp",
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
    url: "https://www.ryzesuperfoods.com",
    logo: "/logo-collab/ryze.webp",
  },
  {
    name: "Blissy",
    handle: "@blissy",
    duration: "2 Years",
    years: 2,
    description: "Luxury silk pillowcase brand partnership creating lifestyle content focused on beauty sleep and self-care essentials.",
    category: "Lifestyle",
    url: "https://www.blissy.com",
    logo: "/logo-collab/blissy.webp",
  },
  {
    name: "Kulfi Beauty",
    handle: "@kulfibeauty",
    duration: "1 Year",
    years: 1,
    description: "Inclusive beauty brand collaboration highlighting vibrant, high-pigment products designed to celebrate diverse skin tones.",
    category: "Beauty & Skincare",
    url: "https://www.kulfibeauty.com",
    logo: "/logo-collab/kulfi.webp",
  },
  {
    name: "Nayrosa Beauty",
    handle: "@nayrosabeauty",
    duration: "1 Year",
    years: 1,
    description: "Skincare partnership centered on self-care rituals and clean beauty routines with premium, naturally-inspired formulas.",
    category: "Beauty & Skincare",
    url: "https://www.nayrosabeauty.com",
    logo: "/logo-collab/nayrosa.webp",
  },
  {
    name: "Ultra Violette",
    handle: "@ultraviolette",
    duration: "1 Year",
    years: 1,
    description: "Australian SPF brand collaboration creating content around sun protection as an essential part of every beauty routine.",
    category: "Beauty & Skincare",
    url: "https://www.ultraviolette.com.au",
    logo: "/logo-collab/ultraviolette.webp",
  },
  {
    name: "Comfrt",
    handle: "@comfrt",
    duration: "1 Year",
    years: 1,
    description: "Wellness lifestyle brand partnership creating cozy, authentic content around everyday comfort and mindful living.",
    category: "Lifestyle",
    url: "https://www.comfrt.com",
    logo: "/logo-collab/comfrt.webp",
  },
  {
    name: "Capital Skin",
    handle: "@capitalskin",
    duration: "1 Year",
    years: 1,
    description: "Premium skincare clinic partnership creating educational content around professional treatments and results-driven skincare.",
    category: "Beauty & Skincare",
    url: "https://www.capitalskin.com",
    logo: "/logo-collab/cs.webp",
  },
];

export interface Testimonial {
  brand: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    brand: "Fashion Nova",
    logo: "/logo-collab/fashionnova.webp",
    quote: "Maria consistently delivers content that exceeds our expectations. Her creativity and professionalism make her one of our most valued long-term ambassadors.",
    author: "Fashion Nova Team",
    role: "Brand Partnerships",
  },
  {
    brand: "Pretty Little Thing",
    logo: "/logo-collab/plt.webp",
    quote: "Working with Maria has been incredible. Her ability to style our pieces and connect with her audience brings real, measurable results every campaign.",
    author: "PLT Collaborations",
    role: "Influencer Marketing",
  },
  {
    brand: "Saint Laurent",
    logo: "/logo-collab/ysl.webp",
    quote: "Maria embodies the essence of our brand. Her editorial approach and attention to detail create content that feels both authentic and luxurious.",
    author: "YSL Digital Team",
    role: "Digital Marketing",
  },
  {
    brand: "WOW Skin Science",
    logo: "/logo-collab/wowskinscience.webp",
    quote: "Maria's genuine passion for skincare shines through every piece of content. Her audience trust translates directly into engagement and conversions.",
    author: "WOW Skin Science",
    role: "Creator Relations",
  },
  {
    brand: "Kulfi Beauty",
    logo: "/logo-collab/kulfi.webp",
    quote: "Maria's content for Kulfi was vibrant, inclusive, and perfectly aligned with our brand values. She brought our products to life in the most beautiful way.",
    author: "Kulfi Beauty",
    role: "Brand Marketing",
  },
];
