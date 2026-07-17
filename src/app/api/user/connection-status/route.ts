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

/** Shapes the user's `accounts` list for the dashboard's account switcher. */
function buildAccountsSummary(
  user: {
    accountId: string | null;
    accounts: {
      accountId: string;
      connectionStatus: string;
      city: string;
      plan: unknown;
    }[];
  }
) {
  return (user.accounts || []).map((a) => {
    const plan = a.plan as { name: string; speed: number; speedUnit: string } | null;
    return {
      accountId: a.accountId,
      connectionStatus: a.connectionStatus,
      city: a.city,
      planName: plan ? `${plan.name} (${plan.speed} ${plan.speedUnit})` : null,
      isActive: a.accountId === user.accountId,
    };
  });
}

/**
 * GET /api/user/connection-status — everything the user dashboard needs:
 * account/connection state for the currently-selected account, the active
 * plan, a billing-cycle expiry estimate, recent payment history, the full
 * list of the user's connections (account switcher), and whether a
 * separate new-connection request is in progress.
 */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const user = await User.findById(session.userId).populate({
      path: "accounts.plan",
      select: "name speed speedUnit",
    });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const accounts = buildAccountsSummary(user);

    // A connection request that hasn't reached "assigned" yet — either the
    // user's very first request (handled by the no-connection branch below)
    // or an *additional* connection they requested on top of one they
    // already have active.
    const inProgressRequest = await ConnectionRequest.findOne({
      user: user._id,
      status: { $in: ["pending", "payment_pending", "payment_done"] },
    })
      .sort({ createdAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit" });

    // If there's nothing in flight, check whether the customer's most
    // recent request was rejected as not serviceable — that's still worth
    // surfacing on the dashboard (with a way to try again) even though it
    // no longer blocks a fresh request.
    const latestRequest = inProgressRequest
      ? null
      : await ConnectionRequest.findOne({ user: user._id })
          .sort({ createdAt: -1 })
          .populate({ path: "plan", select: "name speed speedUnit" });

    const relevantRequest =
      inProgressRequest || (latestRequest?.status === "not_serviceable" ? latestRequest : null);

    const relevantPlan = relevantRequest?.plan as unknown as {
      name: string;
      speed: number;
      speedUnit: string;
    } | null;

    const pendingNewConnection = relevantRequest
      ? {
          status: relevantRequest.status as
            | "pending"
            | "payment_pending"
            | "payment_done"
            | "not_serviceable",
          planName: relevantPlan ? `${relevantPlan.name} (${relevantPlan.speed} ${relevantPlan.speedUnit})` : "Your plan",
        }
      : null;

    if (!user.accountId || user.connectionStatus !== "active") {
      return NextResponse.json({
        user: {
          id: user._id.toString(),
          name: user.name,
          mobile: user.mobile,
          accountId: user.accountId,
          connectionStatus: user.connectionStatus,
        },
        hasConnection: false,
        requestStatus: relevantRequest?.status || null,
        plan: null,
        expiresAt: null,
        daysLeft: null,
        payments: [],
        accounts,
        pendingNewConnection: null,
      });
    }

    const assignedRequest = await ConnectionRequest.findOne({
      user: user._id,
      status: "assigned",
      accountId: user.accountId,
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit prices" });

    const payments = await Payment.find({
      user: user._id,
      $or: [{ connectionRequest: assignedRequest?._id ?? null }, { connectionRequest: null }],
    })
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
      date: `${new Date(p.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}, ${new Date(p.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
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
      accounts,
      pendingNewConnection,
    });
  } catch (err) {
    console.error("[user/connection-status] error:", err);
    return NextResponse.json(
      { error: "Failed to load connection status." },
      { status: 500 }
    );
  }
}
