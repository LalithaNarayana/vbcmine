import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import ConnectionRequest from "@/models/ConnectionRequest";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

const patchSchema = z.object({
  accountId: z.string().trim().min(1, "Enter an Account ID."),
});

/**
 * PATCH /api/connection-requests/:id — admin assigns an Account ID to a
 * pending connection request. This flips the request to "assigned" and
 * activates the underlying user's account, unlocking their dashboard.
 */
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
    const { accountId } = parsed.data;

    await connectDB();

    const connectionRequest = await ConnectionRequest.findById(id);
    if (!connectionRequest) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    const existing = await User.findOne({ accountId });
    if (existing && existing._id.toString() !== connectionRequest.user.toString()) {
      return NextResponse.json(
        { error: "This Account ID is already assigned to another user." },
        { status: 409 }
      );
    }

    connectionRequest.accountId = accountId;
    connectionRequest.status = "assigned";
    await connectionRequest.save();

    await User.findByIdAndUpdate(connectionRequest.user, {
      $set: { accountId, connectionStatus: "active" },
    });

    const populated = await ConnectionRequest.findById(id).populate({
      path: "plan",
      select: "name speed speedUnit",
    });

    return NextResponse.json({ success: true, connectionRequest: populated });
  } catch (err) {
    console.error("[connection-requests/:id] patch error:", err);
    return NextResponse.json(
      { error: "Failed to assign Account ID." },
      { status: 500 }
    );
  }
}
