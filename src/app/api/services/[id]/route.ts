import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BusinessService from "@/models/BusinessService";
import { requireAdmin } from "@/lib/auth";
import { reorderDocument } from "@/lib/reorder";
import { toSlug, ensureUniqueSlug } from "@/lib/slugify";

interface Params {
  params: Promise<{ id: string }>;
}

// PUT is admin-only — id here refers to the Mongo _id (not slug)
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const body = await req.json();
    const { name, badge, tagline, image, icon, description, bulletPoints } = body;

    await connectDB();

    const update: Record<string, unknown> = {
      badge,
      tagline,
      image,
      icon,
      description,
      bulletPoints,
    };

    if (name) {
      update.name = name;
      const baseSlug = toSlug(name);
      update.slug = await ensureUniqueSlug(BusinessService, baseSlug, id);
    }

    const service = await BusinessService.findByIdAndUpdate(id, { $set: update }, { new: true });

    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (err) {
    console.error("[services/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update service." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await BusinessService.findByIdAndDelete(id);

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
    await reorderDocument(BusinessService, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[services/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder service." }, { status: 500 });
  }
}