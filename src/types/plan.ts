export interface PlanCategory {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  order: number;
}

export interface PlanDuration {
  _id: string;
  label: string;
  months: number;
  order: number;
}

export interface PlanBullet {
  _id: string;
  text: string;
  order: number;
}

export interface PlanPrice {
  duration: string | PlanDuration;
  price: number;
}

export interface PlanOtt {
  name: string;
  image: string;
}

export interface Plan {
  _id: string;
  name: string;
  category: string | PlanCategory;
  speed: number;
  speedUnit: "Mbps" | "Gbps";
  prices: PlanPrice[];
  bullets: (string | PlanBullet)[];
  ottList: PlanOtt[];
  mostPopular: boolean;
  order: number;
}