import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers & Sales — VBC On Fiber",
  description: "Exclusive deals on fiber broadband, IPTV bundles, and business solutions. Limited time offers for Visakhapatnam.",
};

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}