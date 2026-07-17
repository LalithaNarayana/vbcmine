import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { requireUser } from "@/lib/userAuth";

const bodySchema = z.object({
  accountId: z.string().trim().min(1, "accountId is required."),
});

/**
 * POST /api/user/switch-account — switches which of the logged-in user's
 * connections is "active" on their dashboard. The chosen account's id
 * becomes the top-level User.accountId/connectionStatus, which is what
 * every other account-scoped feature (ISP status/usage, renewals,
 * upgrades, payment history) reads from — so the rest of the app doesn't
 * need to know anything about multi-account switching happened.
 */
export async function POST(req: NextRequest) {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { accountId } = parsed.data;

    await connectDB();

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const entry = user.accounts.find((a) => a.accountId === accountId);
    if (!entry) {
      return NextResponse.json(
        { error: "That connection doesn't belong to this account." },
        { status: 404 }
      );
    }

    user.accountId = entry.accountId;
    user.connectionStatus = entry.connectionStatus === "active" ? "active" : "inactive";
    await user.save();

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        accountId: user.accountId,
        connectionStatus: user.connectionStatus,
      },
    });
  } catch (err) {
    console.error("[user/switch-account] error:", err);
    return NextResponse.json(
      { error: "Failed to switch account." },
      { status: 500 }
    );
  }
}
