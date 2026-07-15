import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TimelineItem from "@/models/TimelineItem";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR About page success-story timeline
export async function GET() {
  await connectDB();
  const items = await TimelineItem.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(items);
}

// POST is admin-only — creates a new timeline entry
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const { year, description } = body;

    if (!year || !description) {
      return NextResponse.json(
        { error: "Both year and description are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const order = await getNextOrder(TimelineItem);

    const item = await TimelineItem.create({ year, description, order });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("[about/timeline] create error:", err);
    return NextResponse.json(
      { error: "Failed to create timeline entry." },
      { status: 500 }
    );
  }
}