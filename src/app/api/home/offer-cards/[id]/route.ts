import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OfferCard from "@/models/OfferCard";
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
    const { title, description, badge, image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    await connectDB();
    const card = await OfferCard.findByIdAndUpdate(
      id,
      { $set: { title, description, badge, image } },
      { new: true }
    );

    if (!card) {
      return NextResponse.json({ error: "Offer card not found." }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (err) {
    console.error("[home/offer-cards/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update offer card." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await OfferCard.findByIdAndDelete(id);
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
    await reorderDocument(OfferCard, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[home/offer-cards/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder offer card." }, { status: 500 });
  }
}
