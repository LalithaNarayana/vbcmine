import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SectionHeading, { getOrCreateSectionHeadings } from "@/models/SectionHeading";
import { requireAdmin } from "@/lib/auth";

// GET is public — used by every SSR page that displays a section heading.
export async function GET() {
  await connectDB();
  const doc = await getOrCreateSectionHeadings();
  return NextResponse.json(doc);
}

// PUT is admin-only — used by the Section Titles admin editor.
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();

    const allowedSections = [
      "homeOffers",
      "homePlans",
      "homeWhyChoose",
      "homeTestimonials",
      "homeClients",
      "plansPage",
      "servicesPage",
      "contactPage",
      "faqPage",
    ];

    const update: Record<string, unknown> = {};
    for (const section of allowedSections) {
      if (section in body) update[section] = body[section];
    }

    await connectDB();

    const doc = await SectionHeading.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(doc);
  } catch (err) {
    console.error("[section-headings] update error:", err);
    return NextResponse.json(
      { error: "Failed to update section titles." },
      { status: 500 }
    );
  }
}
