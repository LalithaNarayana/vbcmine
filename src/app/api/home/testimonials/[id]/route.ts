import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
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
    const { name, role, image, quote, rating } = await req.json();

    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { $set: { name, role, image, quote, rating } },
      { new: true }
    );

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (err) {
    console.error("[home/testimonials/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update testimonial." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await Testimonial.findByIdAndDelete(id);
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
    await reorderDocument(Testimonial, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[home/testimonials/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder testimonial." }, { status: 500 });
  }
}