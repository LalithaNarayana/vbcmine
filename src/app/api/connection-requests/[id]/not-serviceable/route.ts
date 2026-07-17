import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ConnectionRequest from "@/models/ConnectionRequest";
import { requireAdmin } from "@/lib/auth";
import { notifyUserOnce } from "@/lib/notify";

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/connection-requests/:id/not-serviceable — admin marks a pending
 * connection request as not serviceable (feasibility check failed). This is
 * the alternate outcome to send-payment-link: instead of pushing a payment
 * link, the request is closed out and the customer is notified so they can
 * try a different plan/address. Because "not_serviceable" isn't one of the
 * statuses that blocks a new request, the customer is free to submit a
 * fresh connection request straight away.
 */
export async function POST(_req: Request, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    await connectDB();

    const connectionRequest = await ConnectionRequest.findById(id).populate({
      path: "plan",
      select: "name speed speedUnit",
    });

    if (!connectionRequest) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    if (connectionRequest.status !== "pending") {
      return NextResponse.json(
        { error: "Only requests awaiting verification can be marked not serviceable." },
        { status: 409 }
      );
    }

    connectionRequest.status = "not_serviceable";
    await connectionRequest.save();

    const planDoc = connectionRequest.plan as unknown as { name: string; speed: number; speedUnit: string } | null;

    await notifyUserOnce(
      connectionRequest.user,
      "not-serviceable",
      "We're not serviceable in your area yet",
      `Sorry — we checked and we're not able to provide${
        planDoc ? ` ${planDoc.name} (${planDoc.speed} ${planDoc.speedUnit})` : " service"
      } at the address you shared right now. Please try a different plan or address, and our team will check again.`,
      `not-serviceable:${connectionRequest._id.toString()}`
    );

    return NextResponse.json({ success: true, connectionRequest });
  } catch (err) {
    console.error("[connection-requests/:id/not-serviceable] error:", err);
    return NextResponse.json(
      { error: "Failed to update request." },
      { status: 500 }
    );
  }
}
