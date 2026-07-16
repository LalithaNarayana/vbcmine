import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/users — admin lists all registered users with their
 * currently assigned plan (resolved from the latest "assigned"
 * ConnectionRequest, same logic the user dashboard uses).
 */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const users = await User.find()
      .select("name mobile accountId connectionStatus createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const assignedRequests = await ConnectionRequest.find({ status: "assigned" })
      .populate({ path: "plan", select: "name speed speedUnit" })
      .sort({ updatedAt: -1 })
      .lean();

    // Latest assigned request per user (list is already newest-first).
    const planByUser = new Map<string, { name: string; speed: number; speedUnit: string }>();
    for (const req of assignedRequests) {
      const userId = req.user?.toString();
      if (!userId || planByUser.has(userId)) continue;
      const plan = req.plan as unknown as { name: string; speed: number; speedUnit: string } | null;
      if (plan) {
        planByUser.set(userId, { name: plan.name, speed: plan.speed, speedUnit: plan.speedUnit });
      }
    }

    const result = users.map((u) => ({
      _id: u._id.toString(),
      name: u.name,
      mobile: u.mobile,
      accountId: u.accountId,
      connectionStatus: u.connectionStatus,
      createdAt: u.createdAt,
      plan: planByUser.get(u._id.toString()) || null,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("[admin/users] list error:", err);
    return NextResponse.json({ error: "Failed to load users." }, { status: 500 });
  }
}
