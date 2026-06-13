import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { SpeedHighlight, WhyVBC } from "@/components/home/SpeedHighlight";
import { Testimonials, CTABanner } from "@/components/home/Testimonials";
import ClientsSection from "@/components/home/ClientsSection";

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
