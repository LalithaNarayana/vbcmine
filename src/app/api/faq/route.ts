import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR FAQ page
export async function GET() {
    await connectDB();
    const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
    const session = await requireAdmin();
    if (session instanceof Response) return session;

    try {
        const { category, question, answer } = await req.json();

        if (!category || !question || !answer) {
            return NextResponse.json({ error: "Category, question and answer are required." }, { status: 400 });
        }

        await connectDB();
        const order = await getNextOrder(Faq);

        const faq = await Faq.create({ category, question, answer, order });

        return NextResponse.json(faq, { status: 201 });
    } catch (err) {
        console.error("[faq] create error:", err);
        return NextResponse.json({ error: "Failed to create FAQ." }, { status: 500 });
    }
}