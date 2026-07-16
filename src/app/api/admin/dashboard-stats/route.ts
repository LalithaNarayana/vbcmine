import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/dashboard-stats — top-level numbers for the admin
 * dashboard: total registered users, active subscriptions, and this
 * month's revenue total (successful payments only).
 */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalUsers, activeSubscriptions, revenueAgg] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ connectionStatus: "active" }),
      Payment.aggregate([
        { $match: { status: "success", createdAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    const revenueThisMonth = revenueAgg[0]?.total || 0;

    return NextResponse.json({ totalUsers, activeSubscriptions, revenueThisMonth });
  } catch (err) {
    console.error("[admin/dashboard-stats] error:", err);
    return NextResponse.json({ error: "Failed to load dashboard stats." }, { status: 500 });
  }
}
