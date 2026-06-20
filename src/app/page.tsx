import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { SpeedHighlight, WhyVBC } from "@/components/home/SpeedHighlight";
import { Testimonials, CTABanner } from "@/components/home/Testimonials";
import ClientsSection from "@/components/home/ClientsSection";

export const metadata: Metadata = {
  title: "VBC On Fiber — Vizag's Fastest Fiber Internet & TV Provider",
  description:
    "High-speed fiber broadband up to 1 Gbps, Digital TV, IPTV, and enterprise connectivity in Visakhapatnam since 2012. Unlimited data, no FUP caps, 24/7 local support.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SpeedHighlight />
      <WhyVBC />
      <Testimonials />
      <ClientsSection />
      <CTABanner />
    </>
  );
}
