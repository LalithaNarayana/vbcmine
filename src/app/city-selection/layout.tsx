import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Your City — VBC On Fiber",
  description: "Choose your city to view available VBC On Fiber broadband, IPTV, and connectivity plans near you.",
};

export default function CitySelectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
