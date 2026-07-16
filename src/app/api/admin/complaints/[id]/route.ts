import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Complaint from "@/models/Complaint";
import { requireAdmin } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

const patchSchema = z.object({
  status: z.enum(["Open", "In Progress", "Resolved"]),
});

/** PATCH /api/admin/complaints/:id — admin updates a complaint's status. */
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    await connectDB();

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { $set: { status: parsed.data.status } },
      { new: true }
    ).populate({ path: "user", select: "name mobile accountId" });

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, complaint });
  } catch (err) {
    console.error("[admin/complaints/:id] patch error:", err);
    return NextResponse.json(
      { error: "Failed to update complaint." },
      { status: 500 }
    );
  }
}
