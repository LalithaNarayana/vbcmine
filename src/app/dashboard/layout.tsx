import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard — VBC On Fiber",
  description: "Manage your VBC On Fiber account, view usage stats, plan details, and transaction history.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
