import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PlanBullet from "@/models/PlanBullet";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

export async function GET() {
  await connectDB();
  const bullets = await PlanBullet.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(bullets);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(PlanBullet);

    const bullet = await PlanBullet.create({ text, order });
    return NextResponse.json(bullet, { status: 201 });
  } catch (err) {
    console.error("[plans/bullets] create error:", err);
    return NextResponse.json({ error: "Failed to create bullet." }, { status: 500 });
  }
}