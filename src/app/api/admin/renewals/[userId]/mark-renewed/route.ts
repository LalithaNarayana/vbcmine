import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import { getOrCreateMasterSettings } from "@/models/MasterSettings";
import { calculateGst, roundToTwoDecimals } from "@/lib/planPricing";
import { requireAdmin } from "@/lib/auth";
import { logSubscriptionChange } from "@/lib/subscriptionHistory";

interface Params {
  params: Promise<{ userId: string }>;
}

function cheapestPrice(prices: { duration: unknown; price: number }[]): number {
  if (!prices || prices.length === 0) return 0;
  return [...prices].sort((a, b) => a.price - b.price)[0].price;
}

/**
 * POST /api/admin/renewals/:userId/mark-renewed — for renewals handled
 * outside the normal payment flow (e.g. cash, over the phone). Records a
 * successful "renewal" Payment dated now with provider "admin-manual", so
 * the existing billing-cycle calculation (anchored to the latest successful
 * payment) picks it up automatically and extends the expiry by one cycle.
 */
export async function POST(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { userId } = await params;

  try {
    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const assignedRequest = await ConnectionRequest.findOne({
      user: user._id,
      status: "assigned",
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "plan", select: "name prices" });

    if (!assignedRequest || !assignedRequest.plan) {
      return NextResponse.json(
        { error: "No active plan found for this user." },
        { status: 400 }
      );
    }

    const planDoc = assignedRequest.plan as unknown as {
      _id: Types.ObjectId;
      prices: { duration: unknown; price: number }[];
    };

    const baseAmount = cheapestPrice(planDoc.prices);
    const masterSettings = await getOrCreateMasterSettings();
    const gstPercent = masterSettings.gstPercent;
    const gstAmount = calculateGst(baseAmount, gstPercent);
    const totalAmount = roundToTwoDecimals(baseAmount + gstAmount);

    const payment = await Payment.create({
      user: user._id,
      plan: planDoc._id,
      purpose: "renewal",
      baseAmount,
      gstPercent,
      gstAmount,
      totalAmount,
      status: "success",
      provider: "admin-manual",
      providerOrderId: `manual_${Date.now()}`,
      providerPaymentId: `manual_${Date.now()}`,
    });

    const expiresAt = new Date(payment.createdAt);
    expiresAt.setDate(expiresAt.getDate() + 30);

    await logSubscriptionChange({
      userId: user._id,
      oldPlanId: planDoc._id,
      newPlanId: planDoc._id,
      reason: "renewal",
      note: `Marked renewed by admin (handled outside the normal payment flow).`,
    });

    return NextResponse.json({ success: true, expiresAt: expiresAt.toISOString() });
  } catch (err) {
    console.error("[admin/renewals/:userId/mark-renewed] error:", err);
    return NextResponse.json({ error: "Failed to mark user as renewed." }, { status: 500 });
  }
}