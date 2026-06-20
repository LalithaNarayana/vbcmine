import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Broadband & IPTV Plans — VBC On Fiber",
  description: "Compare VBC On Fiber broadband and IPTV plans by city. Unlimited data, symmetric speeds, no FUP caps.",
};

export default function PlansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
