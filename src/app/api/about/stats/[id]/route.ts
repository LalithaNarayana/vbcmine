import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AboutStat from "@/models/AboutStat";
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
    const { value, label } = body;

    await connectDB();
    const stat = await AboutStat.findByIdAndUpdate(
      id,
      { $set: { value, label } },
      { new: true }
    );

    if (!stat) {
      return NextResponse.json({ error: "Stat not found." }, { status: 404 });
    }

    return NextResponse.json(stat);
  } catch (err) {
    console.error("[about/stats/:id] update error:", err);
    return NextResponse.json(
      { error: "Failed to update stat." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await AboutStat.findByIdAndDelete(id);

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
    await reorderDocument(AboutStat, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[about/stats/:id] reorder error:", err);
    return NextResponse.json(
      { error: "Failed to reorder stat." },
      { status: 500 }
    );
  }
}