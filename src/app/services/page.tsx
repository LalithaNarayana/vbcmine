import type { Metadata } from "next";
import ServicesSection from "@/components/home/ServicesSection";
import { WhyVBC } from "@/components/home/SpeedHighlight";

export const metadata: Metadata = {
  title: "Services — VBC On Fiber",
  description: "Explore VBC's complete connectivity solutions including FTTH broadband, IPTV, VoIP, and enterprise fiber services in Visakhapatnam.",
};

export default function ServicesPage() {
  return (
    <div style={{ background: "#ffffff" }}>

      {/* What We Offer — reuse from home */}
      <ServicesSection />

      {/* Why Choose Us — reuse from home */}
      <WhyVBC />
    </div>
  );
}
