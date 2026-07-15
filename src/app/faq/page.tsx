import connectDB from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { getOrCreateSectionHeadings } from "@/models/SectionHeading";
import FaqPageClient, { FaqSection } from "@/components/faq/FaqPageClient";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  await connectDB();
  const [faqs, headings] = await Promise.all([
    Faq.find().sort({ order: 1, createdAt: 1 }).lean(),
    getOrCreateSectionHeadings(),
  ]);

  const data = JSON.parse(JSON.stringify(faqs)) as {
    category: string;
    question: string;
    answer: string;
  }[];
  const heading = JSON.parse(JSON.stringify(headings.faqPage));

  // Group FAQs by category, preserving the order in which categories first appear.
  const sections: FaqSection[] = [];
  const indexByCategory = new Map<string, number>();

  for (const faq of data) {
    let idx = indexByCategory.get(faq.category);
    if (idx === undefined) {
      idx = sections.length;
      indexByCategory.set(faq.category, idx);
      sections.push({ category: faq.category, items: [] });
    }
    sections[idx].items.push({ q: faq.question, a: faq.answer });
  }

  return <FaqPageClient sections={sections} heading={heading} />;
}