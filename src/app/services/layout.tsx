import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Services — VBC On Fiber",
  description:
    "Enterprise connectivity solutions including Internet Leased Lines, MPLS, Hosting & Colocation, VOIP, and Optical Fiber Lease for businesses in Visakhapatnam.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
