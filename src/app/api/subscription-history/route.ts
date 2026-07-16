import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SubscriptionHistory from "@/models/SubscriptionHistory";
import { requireUser } from "@/lib/userAuth";

/**
 * GET /api/subscription-history — the logged-in user's plan-change
 * timeline (new connection, renewals, upgrades/downgrades), separate
 * from the payment/transaction table.
 */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const history = await SubscriptionHistory.find({ user: session.userId })
      .sort({ createdAt: -1 })
      .populate({ path: "oldPlan", select: "name speed speedUnit" })
      .populate({ path: "newPlan", select: "name speed speedUnit" })
      .lean();

    return NextResponse.json(
      history.map((h) => ({
        _id: h._id.toString(),
        oldPlan: h.oldPlan,
        newPlan: h.newPlan,
        reason: h.reason,
        note: h.note,
        createdAt: h.createdAt,
      }))
    );
  } catch (err) {
    console.error("[subscription-history] list error:", err);
    return NextResponse.json({ error: "Failed to load subscription history." }, { status: 500 });
  }
}
