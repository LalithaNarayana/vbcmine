import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/payments — every transaction across all users, newest
 * first, plus simple totals (collected this month, pending, failed) computed
 * over the full data set regardless of any client-side filtering.
 */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "name mobile accountId" })
      .populate({ path: "plan", select: "name speed speedUnit" })
      .lean();

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let collectedThisMonth = 0;
    let pendingAmount = 0;
    let pendingCount = 0;
    let failedAmount = 0;
    let failedCount = 0;

    for (const p of payments) {
      if (p.status === "success" && new Date(p.createdAt) >= monthStart) {
        collectedThisMonth += p.totalAmount;
      }
      if (p.status === "created") {
        pendingAmount += p.totalAmount;
        pendingCount += 1;
      }
      if (p.status === "failed") {
        failedAmount += p.totalAmount;
        failedCount += 1;
      }
    }

    const items = payments.map((p) => ({
      _id: p._id.toString(),
      user: p.user
        ? {
            name: (p.user as unknown as { name: string }).name,
            mobile: (p.user as unknown as { mobile: string }).mobile,
            accountId: (p.user as unknown as { accountId: string | null }).accountId,
          }
        : null,
      plan: p.plan
        ? {
            name: (p.plan as unknown as { name: string }).name,
            speed: (p.plan as unknown as { speed: number }).speed,
            speedUnit: (p.plan as unknown as { speedUnit: string }).speedUnit,
          }
        : null,
      purpose: p.purpose,
      totalAmount: p.totalAmount,
      status: p.status,
      provider: p.provider,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({
      items,
      totals: {
        collectedThisMonth,
        pendingAmount,
        pendingCount,
        failedAmount,
        failedCount,
      },
    });
  } catch (err) {
    console.error("[admin/payments] list error:", err);
    return NextResponse.json({ error: "Failed to load payments." }, { status: 500 });
  }
}
