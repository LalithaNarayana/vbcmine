export type PlanCategory = "broadband" | "tv" | "combo";

export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number;
  duration: string;
  category: PlanCategory;
  features: string[];
  popular?: boolean;
  tag?: string;
}

export const broadbandPlans: Plan[] = [
  {
    id: "bb-basic",
    name: "Fiber Basic",
    speed: "50 Mbps",
    price: 499,
    duration: "1 Month",
    category: "broadband",
    features: ["50 Mbps Speed", "Unlimited Data", "24/7 Support", "Free Installation"],
  },
  {
    id: "bb-standard",
    name: "Fiber Standard",
    speed: "100 Mbps",
    price: 699,
    duration: "1 Month",
    category: "broadband",
    features: ["100 Mbps Speed", "Unlimited Data", "24/7 Support", "Free Router", "Static IP"],
    popular: true,
    tag: "Most Popular",
  },
  {
    id: "bb-premium",
    name: "Fiber Premium",
    speed: "300 Mbps",
    price: 999,
    duration: "1 Month",
    category: "broadband",
    features: ["300 Mbps Speed", "Unlimited Data", "Priority Support", "Free Router", "Static IP", "OTT Benefits"],
    tag: "Best Value",
  },
  {
    id: "bb-ultra",
    name: "Fiber Ultra",
    speed: "1000 Mbps",
    price: 1499,
    duration: "1 Month",
    category: "broadband",
    features: ["1 Gbps Speed", "Unlimited Data", "Dedicated Support", "Premium Router", "Static IP", "All OTT Platforms"],
    tag: "Power User",
  },
];

export const tvPlans: Plan[] = [
  {
    id: "tv-basic",
    name: "TV Basic",
    speed: "100+ Channels",
    price: 299,
    duration: "1 Month",
    category: "tv",
    features: ["100+ Channels", "SD Quality", "Regional Channels", "News & Sports"],
  },
  {
    id: "tv-premium",
    name: "TV Premium",
    speed: "250+ Channels",
    price: 499,
    duration: "1 Month",
    category: "tv",
    features: ["250+ Channels", "HD Quality", "Regional + National", "Sports Pack", "Movie Channels"],
    popular: true,
    tag: "Popular",
  },
  {
    id: "tv-ultra",
    name: "IPTV Ultra",
    speed: "400+ Channels",
    price: 799,
    duration: "1 Month",
    category: "tv",
    features: ["400+ Channels", "4K/HD Quality", "All Genres", "VOD Library", "Multi-screen", "Catch-up TV"],
    tag: "Premium",
  },
];

export const comboPlans: Plan[] = [
  {
    id: "combo-starter",
    name: "Combo Starter",
    speed: "100 Mbps + TV",
    price: 899,
    duration: "1 Month",
    category: "combo",
    features: ["100 Mbps Internet", "150+ TV Channels", "HD Quality", "Free Installation"],
  },
  {
    id: "combo-pro",
    name: "Combo Pro",
    speed: "300 Mbps + TV",
    price: 1299,
    duration: "1 Month",
    category: "combo",
    features: ["300 Mbps Internet", "250+ TV Channels", "Full HD", "OTT Add-ons", "Priority Support"],
    popular: true,
    tag: "Best Deal",
  },
];