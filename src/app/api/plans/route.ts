import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Plans page and Home "Plans" section.
// Optional ?category=<id> filters to a single Plan Category.
export async function GET(req: NextRequest) {
  await connectDB();

  const category = req.nextUrl.searchParams.get("category");
  const query = category ? { category } : {};

  const plans = await Plan.find(query)
    .sort({ order: 1, createdAt: 1 })
    .populate("category")
    .populate("prices.duration")
    .populate("bullets");

  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const { name, category, speed, speedUnit, prices, bullets, ottList, mostPopular } = body;

    if (!name || !category || speed === undefined) {
      return NextResponse.json(
        { error: "Name, category, and speed are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const order = await getNextOrder(Plan);

    const plan = await Plan.create({
      name,
      category,
      speed,
      speedUnit: speedUnit || "Mbps",
      prices: prices || [],
      bullets: bullets || [],
      ottList: ottList || [],
      mostPopular: !!mostPopular,
      order,
    });

    const populated = await plan.populate([
      { path: "category" },
      { path: "prices.duration" },
      { path: "bullets" },
    ]);

    return NextResponse.json(populated, { status: 201 });
  } catch (err) {
    console.error("[plans] create error:", err);
    return NextResponse.json({ error: "Failed to create plan." }, { status: 500 });
  }
}