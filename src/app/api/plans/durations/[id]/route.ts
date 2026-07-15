import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PlanDuration from "@/models/PlanDuration";
import Plan from "@/models/Plan";
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
    const { label, months } = await req.json();

    await connectDB();
    const duration = await PlanDuration.findByIdAndUpdate(
      id,
      { $set: { label, months: Number(months) } },
      { new: true }
    );

    if (!duration) {
      return NextResponse.json({ error: "Duration not found." }, { status: 404 });
    }

    return NextResponse.json(duration);
  } catch (err) {
    console.error("[plans/durations/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update duration." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();

  // Plans referencing this duration are simply pulled from their durations list on delete.
  await Plan.updateMany({ durations: id }, { $pull: { durations: id } });
  await PlanDuration.findByIdAndDelete(id);

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
    await reorderDocument(PlanDuration, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[plans/durations/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder duration." }, { status: 500 });
  }
}