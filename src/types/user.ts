export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  cityId?: string;
  createdAt: string;
}

export interface ActiveSubscription {
  planId: string;
  planName: string;
  speed: string;
  price: number;
  startDate: string;
  expiryDate: string;
  daysLeft: number;
  status: "active" | "expired" | "suspended";
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "success" | "pending" | "failed";
  method: string;
}
