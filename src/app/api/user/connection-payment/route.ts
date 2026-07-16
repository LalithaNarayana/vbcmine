import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ConnectionRequest from "@/models/ConnectionRequest";
import { requireUser } from "@/lib/userAuth";

/**
 * GET /api/user/connection-payment — the logged-in user's pending
 * new-connection payment (admin verified feasibility and sent a payment
 * link), if any. Powers the "Pay Now" step on the dashboard before the
 * account gets an Account ID assigned.
 */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const connectionRequest = await ConnectionRequest.findOne({
      user: session.userId,
      status: "payment_pending",
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit" })
      .populate({ path: "payment", select: "baseAmount gstPercent gstAmount totalAmount status" });

    if (!connectionRequest || !connectionRequest.payment) {
      return NextResponse.json({ pending: false });
    }

    const payment = connectionRequest.payment as unknown as {
      _id: { toString(): string };
      baseAmount: number;
      gstPercent: number;
      gstAmount: number;
      totalAmount: number;
    };
    const planDoc = connectionRequest.plan as unknown as {
      name: string;
      speed: number;
      speedUnit: string;
    } | null;

    return NextResponse.json({
      pending: true,
      paymentId: payment._id.toString(),
      planName: planDoc ? `${planDoc.name} (${planDoc.speed} ${planDoc.speedUnit})` : "Your plan",
      baseAmount: payment.baseAmount,
      gstPercent: payment.gstPercent,
      gstAmount: payment.gstAmount,
      totalAmount: payment.totalAmount,
    });
  } catch (err) {
    console.error("[user/connection-payment] error:", err);
    return NextResponse.json(
      { error: "Failed to load payment details." },
      { status: 500 }
    );
  }
}
