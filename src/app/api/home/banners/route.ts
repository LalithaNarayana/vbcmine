import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Home page hero slider
export async function GET() {
  await connectDB();
  const banners = await Banner.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(banners);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const { title, subtitle, image, ctaLabel, ctaLink } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image are required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(Banner);

    const banner = await Banner.create({
      title,
      subtitle: subtitle || "",
      image,
      ctaLabel: ctaLabel || "",
      ctaLink: ctaLink || "",
      order,
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (err) {
    console.error("[home/banners] create error:", err);
    return NextResponse.json({ error: "Failed to create banner." }, { status: 500 });
  }
}