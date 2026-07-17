import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import Plan from "@/models/Plan";
import { getOrCreateMasterSettings } from "@/models/MasterSettings";
import { cheapestPrice, calculateGst, roundToTwoDecimals } from "@/lib/planPricing";
import { getPaymentProvider } from "@/lib/payment";
import { requireUser } from "@/lib/userAuth";

const bodySchema = z.object({
  purpose: z.enum(["new-connection", "renewal", "upgrade"]).default("renewal"),
  // Required when purpose === "upgrade" — the plan the user wants to move to.
  planId: z.string().optional(),
});

/**
 * POST /api/payment/create-order — resolves the user's active plan,
 * applies the current GST % from MasterSettings, creates a local Payment
 * record, and opens an order with the configured PaymentProvider (mock
 * for now, a real gateway later via PAYMENT_PROVIDER env swap).
 *
 * For purpose === "upgrade", the amount charged is for the NEW plan
 * (passed in via planId) rather than the plan the user is currently on.
 */
export async function POST(req: NextRequest) {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    const body = await req.json().catch(() => ({}));
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { purpose, planId } = parsed.data;

    if (purpose === "upgrade" && !planId) {
      return NextResponse.json(
        { error: "Please select a plan to upgrade to." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const assignedRequest = await ConnectionRequest.findOne({
      user: user._id,
      status: "assigned",
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit prices" });

    if (!assignedRequest || !assignedRequest.plan) {
      return NextResponse.json(
        { error: "No active plan found for this account. Please contact support." },
        { status: 400 }
      );
    }

    const currentPlanDoc = assignedRequest.plan as unknown as {
      _id: { toString(): string };
      name: string;
      prices: { duration: unknown; price: number }[];
    };

    // For an upgrade, the payment (and the amount charged) is for the
    // NEW plan the user picked — not the plan they're currently on.
    let planDoc = currentPlanDoc;
    if (purpose === "upgrade") {
      if (currentPlanDoc._id.toString() === planId) {
        return NextResponse.json(
          { error: "You're already on this plan." },
          { status: 400 }
        );
      }
      const targetPlan = await Plan.findById(planId).select("name prices");
      if (!targetPlan) {
        return NextResponse.json({ error: "Selected plan was not found." }, { status: 404 });
      }
      planDoc = targetPlan as unknown as {
        _id: { toString(): string };
        name: string;
        prices: { duration: unknown; price: number }[];
      };
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
    const gstAmount = calculateGst(baseAmount, gstPercent);
    const totalAmount = roundToTwoDecimals(baseAmount + gstAmount);

    const payment = await Payment.create({
      user: user._id,
      plan: planDoc._id,
      purpose,
      baseAmount,
      gstPercent,
      gstAmount,
      totalAmount,
      status: "created",
      provider: "mock",
      providerOrderId: `pending_${Date.now()}`,
      providerPaymentId: null,
    });

    const provider = getPaymentProvider();
    const order = await provider.createOrder({
      amount: totalAmount,
      receipt: payment._id.toString(),
    });

    payment.providerOrderId = order.providerOrderId;
    await payment.save();

    return NextResponse.json({
      paymentId: payment._id.toString(),
      providerOrderId: order.providerOrderId,
      currency: order.currency,
      planName: planDoc.name,
      currentPlanName: purpose === "upgrade" ? currentPlanDoc.name : undefined,
      baseAmount,
      gstPercent,
      gstAmount,
      totalAmount,
      meta: order.meta || null,
    });
  } catch (err) {
    console.error("[payment/create-order] error:", err);
    return NextResponse.json(
      { error: "Failed to create payment order." },
      { status: 500 }
    );
  }
}
