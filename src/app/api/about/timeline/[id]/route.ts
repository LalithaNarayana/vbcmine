import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TimelineItem from "@/models/TimelineItem";
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
    const body = await req.json();
    const { year, description } = body;

    await connectDB();
    const item = await TimelineItem.findByIdAndUpdate(
      id,
      { $set: { year, description } },
      { new: true }
    );

    if (!item) {
      return NextResponse.json({ error: "Timeline entry not found." }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err) {
    console.error("[about/timeline/:id] update error:", err);
    return NextResponse.json(
      { error: "Failed to update timeline entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await TimelineItem.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

// Reorder: body { direction: "up" | "down" }
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
    await reorderDocument(TimelineItem, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[about/timeline/:id] reorder error:", err);
    return NextResponse.json(
      { error: "Failed to reorder timeline entry." },
      { status: 500 }
    );
  }
}