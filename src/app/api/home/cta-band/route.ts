import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CtaBand, { getOrCreateCtaBand } from "@/models/CtaBand";
import { requireAdmin } from "@/lib/auth";

// GET is public — used by the SSR Home page's above-footer CTA band
export async function GET() {
  await connectDB();
  const band = await getOrCreateCtaBand();
  return NextResponse.json(band);
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { title, description, ctaLabel, ctaLink } = await req.json();

    await connectDB();
    const band = await CtaBand.findOneAndUpdate(
      {},
      { $set: { title, description, ctaLabel, ctaLink } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(band);
  } catch (err) {
    console.error("[home/cta-band] update error:", err);
    return NextResponse.json({ error: "Failed to update CTA band." }, { status: 500 });
  }
}