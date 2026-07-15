import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PlanBullet from "@/models/PlanBullet";
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
    const { text } = await req.json();

    await connectDB();
    const bullet = await PlanBullet.findByIdAndUpdate(id, { $set: { text } }, { new: true });

    if (!bullet) {
      return NextResponse.json({ error: "Bullet not found." }, { status: 404 });
    }

    return NextResponse.json(bullet);
  } catch (err) {
    console.error("[plans/bullets/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update bullet." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();

  // Bullets in use by plans are simply pulled from those plans' bullet lists on delete.
  await Plan.updateMany({ bullets: id }, { $pull: { bullets: id } });
  await PlanBullet.findByIdAndDelete(id);

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
    await reorderDocument(PlanBullet, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[plans/bullets/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder bullet." }, { status: 500 });
  }
}
