import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BusinessService from "@/models/BusinessService";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";
import { toSlug, ensureUniqueSlug } from "@/lib/slugify";

// GET is public — used by the SSR Services list page
export async function GET() {
  await connectDB();
  const services = await BusinessService.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const { name, badge, tagline, image, icon, description, bulletPoints } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    await connectDB();
    const baseSlug = toSlug(name);
    const slug = await ensureUniqueSlug(BusinessService, baseSlug);
    const order = await getNextOrder(BusinessService);

    const service = await BusinessService.create({
      name,
      slug,
      badge: badge || "",
      tagline: tagline || "",
      image: image || "",
      icon: icon || "briefcase",
      description: description || "",
      bulletPoints: bulletPoints || [],
      order,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    console.error("[services] create error:", err);
    return NextResponse.json({ error: "Failed to create service." }, { status: 500 });
  }
}