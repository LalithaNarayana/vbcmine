import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Payment from "@/models/Payment";
import { requireAdmin } from "@/lib/auth";
import SubscriptionHistory from "@/models/SubscriptionHistory";

interface Params {
  params: Promise<{ id: string }>;
}

/** GET /api/admin/users/:id — admin view of a single user's full detail. */
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    await connectDB();

    const user = await User.findById(id)
      .populate({ path: "accounts.plan", select: "name speed speedUnit" })
      .lean();
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const assignedRequest = user.accountId
      ? await ConnectionRequest.findOne({
          user: user._id,
          status: "assigned",
          accountId: user.accountId,
        })
          .sort({ updatedAt: -1 })
          .populate({ path: "plan", select: "name speed speedUnit" })
          .lean()
      : null;

    const allRequests = await ConnectionRequest.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit" })
      .lean();

    const payments = await Payment.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({ path: "plan", select: "name speed speedUnit" })
      .lean();

    const history = await SubscriptionHistory.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "oldPlan", select: "name speed speedUnit" })
      .populate({ path: "newPlan", select: "name speed speedUnit" })
      .lean();

    return NextResponse.json({
      user: {
        _id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        accountId: user.accountId,
        connectionStatus: user.connectionStatus,
        createdAt: user.createdAt,
      },
      // Every connection this mobile number holds (active or inactive),
      // for the admin to see at a glance that this user has more than
      // one account.
      accounts: (user.accounts || []).map((a) => {
        const plan = a.plan as unknown as { name: string; speed: number; speedUnit: string } | null;
        return {
          accountId: a.accountId,
          connectionStatus: a.connectionStatus,
          city: a.city,
          plan,
          isActive: a.accountId === user.accountId,
          createdAt: a.createdAt,
        };
      }),
      // Every connection request ever raised by this user, including any
      // still in progress (pending / payment_pending / payment_done).
      connectionRequests: allRequests.map((r) => ({
        _id: r._id.toString(),
        status: r.status,
        accountId: r.accountId,
        city: r.city,
        plan: r.plan,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
      plan: assignedRequest?.plan || null,
      payments: payments.map((p) => ({
        _id: p._id.toString(),
        plan: p.plan,
        purpose: p.purpose,
        totalAmount: p.totalAmount,
        status: p.status,
        createdAt: p.createdAt,
      })),
      history: history.map((h) => ({
        _id: h._id.toString(),
        oldPlan: h.oldPlan,
        newPlan: h.newPlan,
        reason: h.reason,
        note: h.note,
        createdAt: h.createdAt,
      })),
    });
  } catch (err) {
    console.error("[admin/users/:id] get error:", err);
    return NextResponse.json({ error: "Failed to load user." }, { status: 500 });
  }
}

const patchSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").optional(),
  mobile: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Mobile number must be 10 digits.")
    .optional(),
  accountId: z.string().trim().min(1).nullable().optional(),
  connectionStatus: z.enum(["pending", "active", "inactive"]).optional(),
});

/**
 * PATCH /api/admin/users/:id — admin edits a user's details and/or
 * toggles Active/Inactive. Setting connectionStatus to "inactive" blocks
 * dashboard access; setting it back to "active" restores it.
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    await connectDB();

    const update: Record<string, unknown> = {};
    if (parsed.data.name !== undefined) update.name = parsed.data.name;
    if (parsed.data.mobile !== undefined) update.mobile = parsed.data.mobile;
    if (parsed.data.accountId !== undefined) update.accountId = parsed.data.accountId;
    if (parsed.data.connectionStatus !== undefined) {
      // Can't reactivate straight to "active" if there's no account yet —
      // fall back to "pending" so it doesn't fake a live connection.
      const user = await User.findById(id).select("accountId");
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }
      update.connectionStatus =
        parsed.data.connectionStatus === "active" && !user.accountId
          ? "pending"
          : parsed.data.connectionStatus;
    }

    const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        accountId: user.accountId,
        connectionStatus: user.connectionStatus,
        createdAt: user.createdAt,
      },
    });
  } catch (err: unknown) {
    const isDupKey =
      typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000;
    console.error("[admin/users/:id] patch error:", err);
    return NextResponse.json(
      { error: isDupKey ? "Mobile number or Account ID already in use." : "Failed to update user." },
      { status: isDupKey ? 409 : 500 }
    );
  }
}
