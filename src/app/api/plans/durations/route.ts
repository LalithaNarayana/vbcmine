import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PlanDuration from "@/models/PlanDuration";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

export async function GET() {
  await connectDB();
  const durations = await PlanDuration.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(durations);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { label, months } = await req.json();

    if (!label) {
      return NextResponse.json({ error: "Label is required." }, { status: 400 });
    }
    if (!months || isNaN(Number(months))) {
      return NextResponse.json({ error: "Months is required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(PlanDuration);

    const duration = await PlanDuration.create({ label, months: Number(months), order });
    return NextResponse.json(duration, { status: 201 });
  } catch (err) {
    console.error("[plans/durations] create error:", err);
    return NextResponse.json({ error: "Failed to create duration." }, { status: 500 });
  }
}