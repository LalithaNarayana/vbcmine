import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import WhyChooseCard from "@/models/WhyChooseCard";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Home "Why Choose Us" section
export async function GET() {
  await connectDB();
  const cards = await WhyChooseCard.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(cards);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { title, description, icon, image } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(WhyChooseCard);

    const card = await WhyChooseCard.create({
      title,
      description: description || "",
      icon: icon || "shield-check",
      image: image || "",
      order,
    });

    return NextResponse.json(card, { status: 201 });
  } catch (err) {
    console.error("[home/why-choose] create error:", err);
    return NextResponse.json({ error: "Failed to create card." }, { status: 500 });
  }
}