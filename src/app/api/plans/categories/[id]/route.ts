import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PlanCategory from "@/models/PlanCategory";
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
    const { name, icon, description } = await req.json();

    await connectDB();
    const category = await PlanCategory.findByIdAndUpdate(
      id,
      { $set: { name, icon, description } },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (err) {
    console.error("[plans/categories/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update category." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();

  const inUse = await Plan.exists({ category: id });
  if (inUse) {
    return NextResponse.json(
      { error: "Cannot delete a category that still has plans assigned to it." },
      { status: 409 }
    );
  }

  await PlanCategory.findByIdAndDelete(id);
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
    await reorderDocument(PlanCategory, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[plans/categories/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder category." }, { status: 500 });
  }
}
