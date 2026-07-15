import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Home Testimonials section
export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { name, role, image, quote, rating } = await req.json();

    if (!name || !quote) {
      return NextResponse.json({ error: "Name and quote are required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(Testimonial);

    const testimonial = await Testimonial.create({
      name,
      role: role || "",
      image: image || "",
      quote,
      rating: rating ?? 5,
      order,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error("[home/testimonials] create error:", err);
    return NextResponse.json({ error: "Failed to create testimonial." }, { status: 500 });
  }
}