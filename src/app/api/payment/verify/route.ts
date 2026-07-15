import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getPaymentProvider } from "@/lib/payment";
import { requireUser } from "@/lib/userAuth";

const bodySchema = z.object({
  paymentId: z.string().min(1, "Missing payment reference."),
  providerPaymentId: z.string().optional(),
  signature: z.string().optional(),
});

/**
 * POST /api/payment/verify — confirms a payment with the configured
 * PaymentProvider and marks the local Payment record success/failed.
 * Idempotent: calling again on an already-successful payment just
 * returns the existing record.
 */
export async function POST(req: NextRequest) {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { paymentId, providerPaymentId, signature } = parsed.data;

    await connectDB();

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found." }, { status: 404 });
    }
    if (payment.user.toString() !== session.userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    if (payment.status === "success") {
      return NextResponse.json({ success: true, payment });
    }

    const provider = getPaymentProvider();
    const result = await provider.verifyPayment({
      providerOrderId: payment.providerOrderId,
      providerPaymentId,
      signature,
    });

    payment.status = result.success ? "success" : "failed";
    payment.providerPaymentId = result.providerPaymentId;
    await payment.save();

    return NextResponse.json({ success: result.success, payment });
  } catch (err) {
    console.error("[payment/verify] error:", err);
    return NextResponse.json(
      { error: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
