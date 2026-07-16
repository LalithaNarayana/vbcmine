import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Complaint from "@/models/Complaint";
import { requireAdmin } from "@/lib/auth";

/** GET /api/admin/complaints — admin lists all complaints, newest first. */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const complaints = await Complaint.find()
      .populate({ path: "user", select: "name mobile accountId" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(complaints);
  } catch (err) {
    console.error("[admin/complaints] list error:", err);
    return NextResponse.json(
      { error: "Failed to load complaints." },
      { status: 500 }
    );
  }
}
