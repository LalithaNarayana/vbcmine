import connectDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import OfferCard from "@/models/OfferCard";
import WhyChooseCard from "@/models/WhyChooseCard";
import Testimonial from "@/models/Testimonial";
import Client from "@/models/Client";
import Plan from "@/models/Plan";
import { getOrCreateHomePlansSection } from "@/models/HomePlansSection";
import { getOrCreateCtaBand } from "@/models/CtaBand";
import { getOrCreateSectionHeadings } from "@/models/SectionHeading";

import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { SpeedHighlight, WhyVBC } from "@/components/home/SpeedHighlight";
import { Testimonials, CTABanner } from "@/components/home/Testimonials";
import ClientsSection from "@/components/home/ClientsSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();

  const [banners, offerCards, whyChooseCards, testimonials, clients, homePlansSection, ctaBand, headings] =
    await Promise.all([
      Banner.find().sort({ order: 1, createdAt: 1 }).lean(),
      OfferCard.find().sort({ order: 1, createdAt: 1 }).lean(),
      WhyChooseCard.find().sort({ order: 1, createdAt: 1 }).lean(),
      Testimonial.find().sort({ order: 1, createdAt: 1 }).lean(),
      Client.find().sort({ order: 1, createdAt: 1 }).lean(),
      getOrCreateHomePlansSection().then((doc) => doc.populate("category")),
      getOrCreateCtaBand(),
      getOrCreateSectionHeadings(),
    ]);

  const featuredCategory = homePlansSection.category as unknown as { _id: unknown; name: string } | null;

  const featuredPlans = featuredCategory
    ? await Plan.find({ category: featuredCategory._id })
        .sort({ order: 1, createdAt: 1 })
        .populate("bullets")
        .populate("prices.duration")
        .lean()
    : [];

  // Serialize everything to plain JSON-safe objects before passing to client components.
  const data = JSON.parse(
    JSON.stringify({
      banners,
      offerCards,
      whyChooseCards,
      testimonials,
      clients,
      featuredPlans,
      featuredCategoryName: featuredCategory?.name || "",
      ctaBand,
      headings,
    })
  );

  return (
    <>
      <HeroSection banners={data.banners} />
      <ServicesSection
        items={data.offerCards}
        tag={data.headings.homeOffers.tag}
        titlePart1={data.headings.homeOffers.titlePart1}
        titlePart2={data.headings.homeOffers.titlePart2}
        titlePart3={data.headings.homeOffers.titlePart3}
        description={data.headings.homeOffers.description}
      />
      <SpeedHighlight
        plans={data.featuredPlans}
        categoryName={data.featuredCategoryName}
        tag={data.headings.homePlans.tag}
        title={data.headings.homePlans.titlePart1}
        description={data.headings.homePlans.description}
        topTagline={data.headings.plansPage.topTagline}
        bottomTagline={data.headings.plansPage.bottomTagline}
      />
      <WhyVBC
        items={data.whyChooseCards}
        tag={data.headings.homeWhyChoose.tag}
        title={data.headings.homeWhyChoose.titlePart1}
        description={data.headings.homeWhyChoose.description}
      />
      <Testimonials
        items={data.testimonials}
        tag={data.headings.homeTestimonials.tag}
        titlePart1={data.headings.homeTestimonials.titlePart1}
        titlePart2={data.headings.homeTestimonials.titlePart2}
        titlePart3={data.headings.homeTestimonials.titlePart3}
        description={data.headings.homeTestimonials.description}
      />
      <ClientsSection
        items={data.clients}
        tag={data.headings.homeClients.tag}
        titlePart1={data.headings.homeClients.titlePart1}
        titlePart2={data.headings.homeClients.titlePart2}
      />
      <CTABanner
        title={data.ctaBand.title}
        description={data.ctaBand.description}
        ctaLabel={data.ctaBand.ctaLabel}
        ctaLink={data.ctaBand.ctaLink}
      />
    </>
  );
}
