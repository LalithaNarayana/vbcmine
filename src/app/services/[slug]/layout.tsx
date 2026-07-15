import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import BusinessService from "@/models/BusinessService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();
  const service = await BusinessService.findOne({ slug }).lean();

  if (!service) {
    return {
      title: "Business Service — VBC On Fiber",
      description: "Explore VBC On Fiber's enterprise connectivity and business solutions in Visakhapatnam.",
    };
  }

  return {
    title: `${service.name} — VBC On Fiber Business Services`,
    description: service.tagline || `Enterprise-grade ${service.name} from VBC On Fiber, Visakhapatnam.`,
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}