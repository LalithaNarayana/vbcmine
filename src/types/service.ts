export interface BusinessService {
  _id: string;
  name: string;
  slug: string;
  badge?: string;
  tagline?: string;
  image: string;
  icon: string;
  description: string;
  bulletPoints: string[];
  order: number;
}