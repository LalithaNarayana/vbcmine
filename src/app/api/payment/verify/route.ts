import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import ConnectionRequest from "@/models/ConnectionRequest";
import { getPaymentProvider } from "@/lib/payment";
import { requireUser } from "@/lib/userAuth";
import { notifyUserOnce } from "@/lib/notify";
import { logSubscriptionChange, classifyPlanChange } from "@/lib/subscriptionHistory";
import { cheapestPrice } from "@/lib/planPricing";

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

    if (result.success) {
      if (payment.purpose === "new-connection") {
        const linkedRequest = await ConnectionRequest.findOne({ payment: payment._id });
        if (linkedRequest && linkedRequest.status === "payment_pending") {
          linkedRequest.status = "payment_done";
          await linkedRequest.save();
        }

        await notifyUserOnce(
          payment.user,
          "payment",
          "Payment successful",
          `We've received your payment of ₹${payment.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. Our team will now schedule the router installation and assign your Account ID shortly.`,
          `payment:${payment._id.toString()}`
        );
      } else if (payment.purpose === "upgrade") {
        // Move the user's active connection onto the new plan and log the
        // change so it shows up in their subscription history timeline.
        const assignedRequest = await ConnectionRequest.findOne({
          user: payment.user,
          status: "assigned",
        })
          .sort({ updatedAt: -1 })
          .populate({ path: "plan", select: "name prices" });

        if (assignedRequest && assignedRequest.plan) {
          const oldPlanDoc = assignedRequest.plan as unknown as {
            _id: Types.ObjectId;
            name: string;
            prices: { duration: unknown; price: number }[];
          };
          const oldPlanId = oldPlanDoc._id;
          const oldPlanName = oldPlanDoc.name;
          const oldPrice = cheapestPrice(oldPlanDoc.prices);
          const reason = classifyPlanChange(oldPrice, payment.baseAmount);

          assignedRequest.plan = payment.plan;
          await assignedRequest.save();

          await logSubscriptionChange({
            userId: payment.user,
            oldPlanId,
            newPlanId: payment.plan,
            reason,
            note: `Plan ${reason}d from ${oldPlanName} via online payment of ₹${payment.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
          });
        }

        await notifyUserOnce(
          payment.user,
          "payment",
          "Plan upgraded",
          `Your payment of ₹${payment.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} was successful and your plan has been updated. Enjoy your new plan!`,
          `payment:${payment._id.toString()}`
        );
      } else {
        await notifyUserOnce(
          payment.user,
          "payment",
          "Payment received",
          `We've received your payment of ₹${payment.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. Thank you!`,
          `payment:${payment._id.toString()}`
        );

        await logSubscriptionChange({
          userId: payment.user,
          oldPlanId: payment.plan,
          newPlanId: payment.plan,
          reason: "renewal",
          note: `Plan renewed via online payment of ₹${payment.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
        });
      }
    }

    return NextResponse.json({ success: result.success, payment });
  } catch (err) {
    console.error("[payment/verify] error:", err);
    return NextResponse.json(
      { error: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
