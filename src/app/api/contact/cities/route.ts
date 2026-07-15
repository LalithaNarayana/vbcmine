import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SalesCity from "@/models/SalesCity";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Contact page's Sales Enquiry city dropdown
export async function GET() {
  await connectDB();
  const cities = await SalesCity.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(cities);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "City name is required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(SalesCity);

    const city = await SalesCity.create({ name, order });

    return NextResponse.json(city, { status: 201 });
  } catch (err) {
    console.error("[contact/cities] create error:", err);
    return NextResponse.json({ error: "Failed to create city." }, { status: 500 });
  }
}