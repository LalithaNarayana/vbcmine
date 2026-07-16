import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import { requireAdmin } from "@/lib/auth";

const BILLING_CYCLE_DAYS = 30;

function cheapestPrice(prices: { duration: unknown; price: number }[]): number {
  if (!prices || prices.length === 0) return 0;
  return [...prices].sort((a, b) => a.price - b.price)[0].price;
}

/**
 * GET /api/admin/renewals — every active (has an account, connectionStatus
 * "active") user with their resolved plan and billing-cycle expiry, sorted
 * by soonest-to-expire first. Mirrors the exact cycle-anchor logic used by
 * /api/user/connection-status so the numbers always match what the user sees.
 */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const users = await User.find({ connectionStatus: "active", accountId: { $ne: null } })
      .select("name mobile accountId createdAt updatedAt")
      .lean();

    const rows = await Promise.all(
      users.map(async (user) => {
        const assignedRequest = await ConnectionRequest.findOne({
          user: user._id,
          status: "assigned",
        })
          .sort({ updatedAt: -1 })
          .populate({ path: "plan", select: "name speed speedUnit prices" })
          .lean();

        if (!assignedRequest || !assignedRequest.plan) return null;

        const lastSuccessfulPayment = await Payment.findOne({ user: user._id, status: "success" })
          .sort({ createdAt: -1 })
          .lean();

        const cycleStart = lastSuccessfulPayment
          ? new Date(lastSuccessfulPayment.createdAt)
          : new Date(assignedRequest.updatedAt);

        const expiresAt = new Date(cycleStart);
        expiresAt.setDate(expiresAt.getDate() + BILLING_CYCLE_DAYS);

        const daysLeft = Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

        const planDoc = assignedRequest.plan as unknown as {
          name: string;
          speed: number;
          speedUnit: string;
          prices: { duration: unknown; price: number }[];
        };

        return {
          userId: user._id.toString(),
          name: user.name,
          mobile: user.mobile,
          accountId: user.accountId,
          plan: {
            name: planDoc.name,
            speed: planDoc.speed,
            speedUnit: planDoc.speedUnit,
            price: cheapestPrice(planDoc.prices),
          },
          expiresAt: expiresAt.toISOString(),
          daysLeft,
        };
      })
    );

    const filtered = rows.filter((r): r is NonNullable<typeof r> => r !== null);
    filtered.sort((a, b) => a.daysLeft - b.daysLeft);

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("[admin/renewals] list error:", err);
    return NextResponse.json({ error: "Failed to load renewals." }, { status: 500 });
  }
}
