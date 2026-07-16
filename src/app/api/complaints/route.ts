import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Complaint from "@/models/Complaint";
import { requireUser } from "@/lib/userAuth";

const createSchema = z.object({
  subject: z.string().trim().min(3, "Please enter a subject."),
  description: z.string().trim().min(10, "Please describe your issue in a bit more detail."),
});

/** POST /api/complaints — logged-in user raises a new ticket. */
export async function POST(req: NextRequest) {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { subject, description } = parsed.data;

    await connectDB();

    const complaint = await Complaint.create({
      user: session.userId,
      subject,
      description,
      status: "Open",
    });

    return NextResponse.json({ success: true, complaint }, { status: 201 });
  } catch (err) {
    console.error("[complaints] create error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/** GET /api/complaints — logged-in user's own complaints, newest first. */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const complaints = await Complaint.find({ user: session.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(complaints);
  } catch (err) {
    console.error("[complaints] list error:", err);
    return NextResponse.json(
      { error: "Failed to load complaints." },
      { status: 500 }
    );
  }
}
