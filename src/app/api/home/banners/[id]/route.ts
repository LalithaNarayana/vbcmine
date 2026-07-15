import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { requireAdmin } from "@/lib/auth";
import { reorderDocument } from "@/lib/reorder";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const { title, subtitle, image, ctaLabel, ctaLink } = await req.json();

    await connectDB();
    const banner = await Banner.findByIdAndUpdate(
      id,
      { $set: { title, subtitle, image, ctaLabel, ctaLink } },
      { new: true }
    );

    if (!banner) {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (err) {
    console.error("[home/banners/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update banner." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await Banner.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const { direction } = await req.json();
    if (direction !== "up" && direction !== "down") {
      return NextResponse.json({ error: "Invalid direction." }, { status: 400 });
    }

    await connectDB();
    await reorderDocument(Banner, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[home/banners/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder banner." }, { status: 500 });
  }
}