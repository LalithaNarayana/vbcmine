import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { requireUser } from "@/lib/userAuth";

/**
 * GET /api/user/accounts — every connection this mobile number has ever
 * had assigned (active or inactive), for the dashboard's account switcher
 * and the "you already have N connection(s)" context on the new-connection
 * form.
 */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const user = await User.findById(session.userId)
      .populate({ path: "accounts.plan", select: "name speed speedUnit" })
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const accounts = (user.accounts || []).map((a) => {
      const plan = a.plan as unknown as
        | { name: string; speed: number; speedUnit: string }
        | null;
      return {
        id: a._id?.toString(),
        accountId: a.accountId,
        connectionStatus: a.connectionStatus,
        city: a.city,
        plan: plan ? { name: plan.name, speed: plan.speed, speedUnit: plan.speedUnit } : null,
        isActive: a.accountId === user.accountId,
        createdAt: a.createdAt,
      };
    });

    return NextResponse.json({
      accounts,
      activeAccountId: user.accountId,
    });
  } catch (err) {
    console.error("[user/accounts] error:", err);
    return NextResponse.json(
      { error: "Failed to load your connections." },
      { status: 500 }
    );
  }
}
