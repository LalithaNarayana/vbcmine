import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SalesCity from "@/models/SalesCity";
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
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "City name is required." }, { status: 400 });
    }

    await connectDB();
    const city = await SalesCity.findByIdAndUpdate(id, { $set: { name } }, { new: true });

    if (!city) {
      return NextResponse.json({ error: "City not found." }, { status: 404 });
    }

    return NextResponse.json(city);
  } catch (err) {
    console.error("[contact/cities/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update city." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await SalesCity.findByIdAndDelete(id);
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
    await reorderDocument(SalesCity, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/cities/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder city." }, { status: 500 });
  }
}