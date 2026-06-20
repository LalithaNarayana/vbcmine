import type { Metadata } from "next";

const titles: Record<string, { title: string; subtitle: string }> = {
  ill: { title: "Internet Leased Lines (ILL)", subtitle: "Dedicated High-Speed Symmetric Connectivity" },
  mpls: { title: "MPLS Connectivity", subtitle: "Point-to-Point and Point-to-Multipoint" },
  hosting: { title: "Hosting & Server Colocation", subtitle: "Secure Data Center Services" },
  voip: { title: "VOIP / IBS Solutions", subtitle: "Voice over IP and Enterprise Telephony" },
  "optical-fiber": { title: "Optical Fiber Lease", subtitle: "Dedicated Underground Fiber Connectivity" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = titles[slug];

  if (!service) {
    return {
      title: "Business Service — VBC On Fiber",
      description: "Explore VBC On Fiber's enterprise connectivity and business solutions in Visakhapatnam.",
    };
  }

  return {
    title: `${service.title} — VBC On Fiber Business Services`,
    description: `${service.subtitle}. Enterprise-grade ${service.title} from VBC On Fiber, Visakhapatnam.`,
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
