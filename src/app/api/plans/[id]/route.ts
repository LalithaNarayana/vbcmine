import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
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
    const body = await req.json();
    const { name, category, speed, speedUnit, prices, bullets, ottList, mostPopular } = body;

    await connectDB();
    const plan = await Plan.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          category,
          speed,
          speedUnit,
          prices,
          bullets,
          ottList,
          mostPopular: !!mostPopular,
        },
      },
      { new: true }
    ).populate([{ path: "category" }, { path: "prices.duration" }, { path: "bullets" }]);

    if (!plan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (err) {
    console.error("[plans/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update plan." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await Plan.findByIdAndDelete(id);

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
    await reorderDocument(Plan, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[plans/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder plan." }, { status: 500 });
  }
}
