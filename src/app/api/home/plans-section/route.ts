import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomePlansSection, { getOrCreateHomePlansSection } from "@/models/HomePlansSection";
import { requireAdmin } from "@/lib/auth";

// GET is public — used by the SSR Home page to know which Plan
// Category's plans to feature.
export async function GET() {
  await connectDB();
  const doc = await getOrCreateHomePlansSection();
  const populated = await doc.populate("category");
  return NextResponse.json(populated);
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { category } = await req.json();

    await connectDB();
    const doc = await HomePlansSection.findOneAndUpdate(
      {},
      { $set: { category: category || null } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate("category");

    return NextResponse.json(doc);
  } catch (err) {
    console.error("[home/plans-section] update error:", err);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}