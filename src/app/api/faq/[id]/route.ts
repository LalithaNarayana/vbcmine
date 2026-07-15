import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { requireAdmin } from "@/lib/auth";
import { reorderDocument } from "@/lib/reorder";

interface Params {
    params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Params) {
    const session = await requireAdmin();
    if (session instanceof Response) return session;

    const { id } = await params;

    try {
        const { category, question, answer } = await req.json();

        await connectDB();
        const faq = await Faq.findByIdAndUpdate(
            id,
            { $set: { category, question, answer } },
            { new: true }
        );

        if (!faq) {
            return NextResponse.json({ error: "FAQ not found." }, { status: 404 });
        }

        return NextResponse.json(faq);
    } catch (err) {
        console.error("[faq/:id] update error:", err);
        return NextResponse.json({ error: "Failed to update FAQ." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const session = await requireAdmin();
    if (session instanceof Response) return session;

    const { id } = await params;

    await connectDB();
    await Faq.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await requireAdmin();
    if (session instanceof Response) return session;

    const { id } = await params;

    try {
        const { direction } = await req.json();
        if (direction !== "up" && direction !== "down") {
            return NextResponse.json({ error: "Invalid direction." }, { status: 400 });
        }

        await connectDB();
        await reorderDocument(Faq, id, direction);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[faq/:id] reorder error:", err);
        return NextResponse.json({ error: "Failed to reorder FAQ." }, { status: 500 });
    }
}