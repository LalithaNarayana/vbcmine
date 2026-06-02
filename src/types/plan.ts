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
