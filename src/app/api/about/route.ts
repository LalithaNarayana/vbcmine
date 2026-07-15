import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import About, { getOrCreateAbout } from "@/models/About";
import { requireAdmin } from "@/lib/auth";

// GET is public — used by the SSR About page
export async function GET() {
  await connectDB();
  const about = await getOrCreateAbout();
  return NextResponse.json(about);
}

// PUT is admin-only — used by the About admin content editor
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();

    const allowedSections = [
      "aboutVbc",
      "companyProfile",
      "whySection",
      "successStory",
      "mission",
      "vision",
      "values",
    ];

    const update: Record<string, unknown> = {};
    for (const section of allowedSections) {
      if (section in body) update[section] = body[section];
    }

    await connectDB();

    const about = await About.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(about);
  } catch (err) {
    console.error("[about] update error:", err);
    return NextResponse.json(
      { error: "Failed to update About content." },
      { status: 500 }
    );
  }
}