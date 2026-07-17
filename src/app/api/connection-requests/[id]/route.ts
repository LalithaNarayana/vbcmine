import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import ConnectionRequest from "@/models/ConnectionRequest";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";
import { notifyUserOnce } from "@/lib/notify";
import { logSubscriptionChange } from "@/lib/subscriptionHistory";

interface Params {
  params: Promise<{ id: string }>;
}

const patchSchema = z.object({
  accountId: z.string().trim().min(1, "Enter an Account ID."),
});

/**
 * PATCH /api/connection-requests/:id — admin assigns an Account ID to a
 * pending connection request. This flips the request to "assigned" and
 * activates the underlying user's account, unlocking their dashboard.
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
    const { accountId } = parsed.data;

    await connectDB();

    const connectionRequest = await ConnectionRequest.findById(id);
    if (!connectionRequest) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    if (connectionRequest.status !== "payment_done" && connectionRequest.status !== "assigned") {
      return NextResponse.json(
        {
          error:
            connectionRequest.status === "pending"
              ? "Verify feasibility and send a payment link before assigning an Account ID."
              : "Waiting for the customer to complete payment before an Account ID can be assigned.",
        },
        { status: 409 }
      );
    }

    // Account IDs must be unique across every user AND across every entry
    // in every user's `accounts` list (a user can hold more than one).
    const existing = await User.findOne({
      $or: [{ accountId }, { "accounts.accountId": accountId }],
    });
    if (existing && existing._id.toString() !== connectionRequest.user.toString()) {
      return NextResponse.json(
        { error: "This Account ID is already assigned to another user." },
        { status: 409 }
      );
    }

    const wasAlreadyAssigned = connectionRequest.status === "assigned";
    const previousAccountId = connectionRequest.accountId;

    connectionRequest.accountId = accountId;
    connectionRequest.status = "assigned";
    await connectionRequest.save();

    const user = await User.findById(connectionRequest.user);
    if (user) {
      const requestIdStr = connectionRequest._id.toString();
      const entry = user.accounts.find(
        (a) => a.connectionRequest?.toString() === requestIdStr
      );

      if (entry) {
        // Re-saving an Account ID on a request that was already assigned
        // (admin correcting a typo, etc.) — update the matching entry.
        entry.accountId = accountId;
        entry.connectionStatus = "active";
      } else {
        user.accounts.push({
          accountId,
          connectionStatus: "active",
          connectionRequest: connectionRequest._id,
          plan: connectionRequest.plan,
          city: connectionRequest.city,
          createdAt: new Date(),
        } as never);
      }

      if (!wasAlreadyAssigned) {
        // Brand-new assignment. If the user has no currently-selected
        // account yet, make this one it so it shows up on their dashboard
        // right away. Otherwise this is an *additional* connection — it's
        // added to their account list, but we don't yank them off the
        // account they're currently viewing; they can switch to it
        // whenever they like via the account switcher.
        if (!user.accountId) {
          user.accountId = accountId;
          user.connectionStatus = "active";
        }
      } else if (user.accountId === previousAccountId) {
        // Admin corrected the Account ID on the request that happens to be
        // the user's currently-selected one — keep the selection pointed
        // at it under its new id.
        user.accountId = accountId;
      }

      await user.save();
    }

    if (!wasAlreadyAssigned) {
      await logSubscriptionChange({
        userId: connectionRequest.user,
        oldPlanId: null,
        newPlanId: connectionRequest.plan,
        reason: "new-connection",
        note: `Connection activated with Account ID ${accountId}.`,
      });
    }

    await notifyUserOnce(
      connectionRequest.user,
      "activation",
      "Plan activated",
      `Your connection has been activated with Account ID ${accountId}. Welcome aboard!`,
      `activation:${connectionRequest._id.toString()}:${accountId}`
    );

    const populated = await ConnectionRequest.findById(id).populate({
      path: "plan",
      select: "name speed speedUnit",
    });

    return NextResponse.json({ success: true, connectionRequest: populated });
  } catch (err) {
    console.error("[connection-requests/:id] patch error:", err);
    return NextResponse.json(
      { error: "Failed to assign Account ID." },
      { status: 500 }
    );
  }
}
