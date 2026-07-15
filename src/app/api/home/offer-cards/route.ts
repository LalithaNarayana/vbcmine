import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OfferCard from "@/models/OfferCard";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Home "What We Offer" section
export async function GET() {
  await connectDB();
  const cards = await OfferCard.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(cards);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { title, description, badge, image } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (!image) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(OfferCard);

    const card = await OfferCard.create({
      title,
      description: description || "",
      badge: badge || "",
      image,
      order,
    });

    return NextResponse.json(card, { status: 201 });
  } catch (err) {
    console.error("[home/offer-cards] create error:", err);
    return NextResponse.json({ error: "Failed to create offer card." }, { status: 500 });
  }
}