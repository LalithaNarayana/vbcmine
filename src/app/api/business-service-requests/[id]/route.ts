import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import BusinessServiceRequest from "@/models/BusinessServiceRequest";
import { requireAdmin } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

const patchSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});

/** PATCH /api/business-service-requests/:id — admin updates the status of an enquiry. */
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

    const request = await BusinessServiceRequest.findByIdAndUpdate(
      id,
      { $set: { status: parsed.data.status } },
      { new: true }
    );

    if (!request) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, request });
  } catch (err) {
    console.error("[business-service-requests/:id] patch error:", err);
    return NextResponse.json(
      { error: "Failed to update request." },
      { status: 500 }
    );
  }
}
