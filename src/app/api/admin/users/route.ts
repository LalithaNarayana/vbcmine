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
      .select("name mobile accountId connectionStatus accounts createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const assignedRequests = await ConnectionRequest.find({ status: "assigned" })
      .populate({ path: "plan", select: "name speed speedUnit" })
      .sort({ updatedAt: -1 })
      .lean();

    // Latest assigned request *for the user's currently-selected account*
    // (a user may have more than one assigned connection).
    const planByUserAccount = new Map<string, { name: string; speed: number; speedUnit: string }>();
    for (const req of assignedRequests) {
      const key = `${req.user?.toString()}:${req.accountId}`;
      if (!req.user || planByUserAccount.has(key)) continue;
      const plan = req.plan as unknown as { name: string; speed: number; speedUnit: string } | null;
      if (plan) {
        planByUserAccount.set(key, { name: plan.name, speed: plan.speed, speedUnit: plan.speedUnit });
      }
    }

    const result = users.map((u) => ({
      _id: u._id.toString(),
      name: u.name,
      mobile: u.mobile,
      accountId: u.accountId,
      connectionStatus: u.connectionStatus,
      createdAt: u.createdAt,
      accountsCount: (u.accounts || []).length,
      plan: u.accountId
        ? planByUserAccount.get(`${u._id.toString()}:${u.accountId}`) || null
        : null,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("[admin/users] list error:", err);
    return NextResponse.json({ error: "Failed to load users." }, { status: 500 });
  }
}
