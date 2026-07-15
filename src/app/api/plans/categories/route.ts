import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PlanCategory from "@/models/PlanCategory";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Plans page and admin picker
export async function GET() {
  await connectDB();
  const categories = await PlanCategory.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const { name, icon, description } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(PlanCategory);

    const category = await PlanCategory.create({
      name,
      icon: icon || "wifi",
      description: description || "",
      order,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error("[plans/categories] create error:", err);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}