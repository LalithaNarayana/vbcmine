import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import { getOrCreateMasterSettings } from "@/models/MasterSettings";
import { cheapestPrice } from "@/lib/planPricing";
import { requireAdmin } from "@/lib/auth";
import { notifyUserOnce } from "@/lib/notify";

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/connection-requests/:id/send-payment-link — admin confirms
 * feasibility for a pending connection request and pushes a payment link
 * to the user. Creates the Payment record (mock gateway for now, real
 * SMS/WhatsApp delivery is a later integration — a notification is what
 * actually surfaces this to the user today) and flips the request to
 * "payment_pending". Once the user pays, /api/payment/verify marks the
 * request "payment_done" and it's ready for Account ID assignment.
 */
export async function POST(_req: Request, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    await connectDB();

    const connectionRequest = await ConnectionRequest.findById(id).populate({
      path: "plan",
      select: "name speed speedUnit prices",
    });

    if (!connectionRequest) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    if (connectionRequest.status !== "pending") {
      return NextResponse.json(
        { error: "A payment link has already been sent for this request." },
        { status: 409 }
      );
    }

    const planDoc = connectionRequest.plan as unknown as {
      _id: { toString(): string };
      name: string;
      prices: { duration: unknown; price: number }[];
    };

    if (!planDoc) {
      return NextResponse.json({ error: "Selected plan was not found." }, { status: 400 });
    }

    const baseAmount = cheapestPrice(planDoc.prices);
    if (baseAmount <= 0) {
      return NextResponse.json(
        { error: "This plan has no valid pricing configured." },
        { status: 400 }
      );
    }

    const masterSettings = await getOrCreateMasterSettings();
    const gstPercent = masterSettings.gstPercent;
    const gstAmount = Math.round((baseAmount * gstPercent) / 100);
    const totalAmount = baseAmount + gstAmount;

    const payment = await Payment.create({
      user: connectionRequest.user,
      plan: planDoc._id,
      purpose: "new-connection",
      baseAmount,
      gstPercent,
      gstAmount,
      totalAmount,
      status: "created",
      provider: "mock",
      providerOrderId: `pending_${Date.now()}`,
      providerPaymentId: null,
    });

    connectionRequest.payment = payment._id;
    connectionRequest.status = "payment_pending";
    await connectionRequest.save();

    // In-app notification is live today. SMS/WhatsApp delivery of the same
    // payment link is a later integration — see purpose note above.
    await notifyUserOnce(
      connectionRequest.user,
      "payment",
      "Payment required to proceed",
      `Good news — your connection request has been verified! Please pay ₹${totalAmount.toLocaleString("en-IN")} to proceed with installation.`,
      `payment-link:${connectionRequest._id.toString()}`
    );

    const populated = await ConnectionRequest.findById(id)
      .populate({ path: "plan", select: "name speed speedUnit" })
      .populate({ path: "payment", select: "totalAmount status" });

    return NextResponse.json({ success: true, connectionRequest: populated });
  } catch (err) {
    console.error("[connection-requests/:id/send-payment-link] error:", err);
    return NextResponse.json(
      { error: "Failed to send payment link." },
      { status: 500 }
    );
  }
}
