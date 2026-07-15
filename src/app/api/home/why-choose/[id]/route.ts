import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import WhyChooseCard from "@/models/WhyChooseCard";
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
    const { title, description, icon, image } = await req.json();

    await connectDB();
    const card = await WhyChooseCard.findByIdAndUpdate(
      id,
      { $set: { title, description, icon, image } },
      { new: true }
    );

    if (!card) {
      return NextResponse.json({ error: "Card not found." }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (err) {
    console.error("[home/why-choose/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update card." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await WhyChooseCard.findByIdAndDelete(id);
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
    await reorderDocument(WhyChooseCard, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[home/why-choose/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder card." }, { status: 500 });
  }
}