import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import { requireUser } from "@/lib/userAuth";
import { notifyUserOnce } from "@/lib/notify";

const BILLING_CYCLE_DAYS = 30;

/** Picks the lowest-priced (typically monthly) price entry off a plan. */
function cheapestPrice(prices: { duration: unknown; price: number }[]): number {
  if (!prices || prices.length === 0) return 0;
  return [...prices].sort((a, b) => a.price - b.price)[0].price;
}

/**
 * GET /api/user/connection-status — everything the user dashboard needs:
 * account/connection state, the active plan (resolved from the most
 * recently assigned ConnectionRequest), a billing-cycle expiry estimate,
 * and recent payment history for the transaction table.
 */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (!user.accountId || user.connectionStatus !== "active") {
      const latestRequest = await ConnectionRequest.findOne({ user: user._id })
        .sort({ createdAt: -1 })
        .select("status");

      return NextResponse.json({
        user: {
          id: user._id.toString(),
          name: user.name,
          mobile: user.mobile,
          accountId: user.accountId,
          connectionStatus: user.connectionStatus,
        },
        hasConnection: false,
        requestStatus: latestRequest?.status || null,
        plan: null,
        expiresAt: null,
        daysLeft: null,
        payments: [],
      });
    }

    const assignedRequest = await ConnectionRequest.findOne({
      user: user._id,
      status: "assigned",
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit prices" });

    const payments = await Payment.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate({ path: "plan", select: "name speed speedUnit" })
      .lean();

    const lastSuccessfulPayment = payments.find((p) => p.status === "success");

    // Billing cycle anchor: the last successful payment date, falling back
    // to when the connection was assigned (i.e. first activation).
    const cycleStart = lastSuccessfulPayment
      ? new Date(lastSuccessfulPayment.createdAt)
      : assignedRequest
      ? new Date(assignedRequest.updatedAt)
      : new Date(user.updatedAt);

    const expiresAt = new Date(cycleStart);
    expiresAt.setDate(expiresAt.getDate() + BILLING_CYCLE_DAYS);

    const daysLeft = Math.ceil(
      (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    // Renewal-due notification — deduped per billing cycle so this doesn't
    // re-fire on every dashboard load, only once per expiry date.
    if (daysLeft <= 5) {
      const cycleKey = expiresAt.toISOString().slice(0, 10);
      await notifyUserOnce(
        user._id,
        "renewal",
        "Plan renewal due soon",
        `Your plan expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}. Renew now to avoid interruption.`,
        `renewal:${cycleKey}`
      );
    }

    const planDoc = assignedRequest?.plan as unknown as {
      _id: { toString(): string };
      name: string;
      speed: number;
      speedUnit: string;
      prices: { duration: unknown; price: number }[];
    } | null;

    const plan = planDoc
      ? {
          id: planDoc._id.toString(),
          name: planDoc.name,
          speed: planDoc.speed,
          speedUnit: planDoc.speedUnit,
          price: cheapestPrice(planDoc.prices),
        }
      : null;

    const paymentHistory = payments.map((p) => ({
      id: p._id.toString(),
      date: new Date(p.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      description: p.plan
        ? `${(p.plan as unknown as { name: string }).name} — ${
            p.purpose === "new-connection" ? "New Connection" : p.purpose === "upgrade" ? "Plan Upgrade" : "Renewal"
          }`
        : p.purpose === "new-connection"
        ? "New Connection"
        : p.purpose === "upgrade"
        ? "Plan Upgrade"
        : "Renewal",
      amount: p.totalAmount,
      status: p.status === "success" ? "success" : p.status === "failed" ? "failed" : "pending",
      method: p.provider === "mock" ? "Mock Gateway" : p.provider,
    }));

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        accountId: user.accountId,
        connectionStatus: user.connectionStatus,
      },
      hasConnection: true,
      requestStatus: "assigned",
      plan,
      expiresAt: expiresAt.toISOString(),
      daysLeft,
      payments: paymentHistory,
    });
  } catch (err) {
    console.error("[user/connection-status] error:", err);
    return NextResponse.json(
      { error: "Failed to load connection status." },
      { status: 500 }
    );
  }
}
