import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AboutStat from "@/models/AboutStat";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR About page red band
export async function GET() {
  await connectDB();
  const stats = await AboutStat.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(stats);
}

// POST is admin-only — creates a new stat
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const { value, label } = body;

    if (!value || !label) {
      return NextResponse.json(
        { error: "Both value and label are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const order = await getNextOrder(AboutStat);

    const stat = await AboutStat.create({ value, label, order });
    return NextResponse.json(stat, { status: 201 });
  } catch (err) {
    console.error("[about/stats] create error:", err);
    return NextResponse.json(
      { error: "Failed to create stat." },
      { status: 500 }
    );
  }
}