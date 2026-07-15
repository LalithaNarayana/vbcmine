import connectDB from "@/lib/mongodb";
import { getOrCreateSettings } from "@/models/Settings";
import SalesCity from "@/models/SalesCity";
import { getOrCreateSectionHeadings } from "@/models/SectionHeading";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  await connectDB();

  const [settings, cityDocs, headings] = await Promise.all([
    getOrCreateSettings(),
    SalesCity.find().sort({ order: 1, createdAt: 1 }).lean(),
    getOrCreateSectionHeadings(),
  ]);

  const data = JSON.parse(
    JSON.stringify({
      settings: {
        contact1: settings.contact1,
        contact2: settings.contact2,
        whatsappNumber: settings.whatsappNumber,
        mail1: settings.mail1,
        mail2: settings.mail2,
        address: settings.address,
        workingHours: settings.workingHours,
      },
      cities: cityDocs.map((c) => c.name),
      heading: headings.contactPage,
    })
  );

  return <ContactPageClient settings={data.settings} cities={data.cities} heading={data.heading} />;
}