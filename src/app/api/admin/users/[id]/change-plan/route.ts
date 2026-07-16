import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ConnectionRequest from "@/models/ConnectionRequest";
import Plan from "@/models/Plan";
import { requireAdmin } from "@/lib/auth";
import { logSubscriptionChange, classifyPlanChange } from "@/lib/subscriptionHistory";

interface Params {
  params: Promise<{ id: string }>;
}

const bodySchema = z.object({
  planId: z.string().min(1, "Please select a plan."),
});

function cheapestPrice(prices: { duration: unknown; price: number }[]): number {
  if (!prices || prices.length === 0) return 0;
  return [...prices].sort((a, b) => a.price - b.price)[0].price;
}

/**
 * POST /api/admin/users/:id/change-plan — admin moves a user's active
 * connection to a different plan (upgrade or downgrade). Updates the plan
 * on their latest assigned ConnectionRequest and logs a SubscriptionHistory
 * entry so it shows up in the user's plan-change timeline.
 */
export async function POST(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const assignedRequest = await ConnectionRequest.findOne({
      user: user._id,
      status: "assigned",
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "plan", select: "name prices" });

    if (!assignedRequest || !assignedRequest.plan) {
      return NextResponse.json(
        { error: "This user has no active connection to change the plan on." },
        { status: 400 }
      );
    }

    const oldPlanDoc = assignedRequest.plan as unknown as {
      _id: Types.ObjectId;
      name: string;
      prices: { duration: unknown; price: number }[];
    };

    if (oldPlanDoc._id.toString() === parsed.data.planId) {
      return NextResponse.json({ error: "User is already on this plan." }, { status: 400 });
    }

    const newPlan = await Plan.findById(parsed.data.planId);
    if (!newPlan) {
      return NextResponse.json({ error: "Selected plan was not found." }, { status: 404 });
    }

    const oldPrice = cheapestPrice(oldPlanDoc.prices);
    const newPrice = cheapestPrice(newPlan.prices);
    const reason = classifyPlanChange(oldPrice, newPrice);

    assignedRequest.plan = newPlan._id;
    await assignedRequest.save();

    await logSubscriptionChange({
      userId: user._id,
      oldPlanId: oldPlanDoc._id,
      newPlanId: newPlan._id,
      reason,
      note: `Plan changed by admin from ${oldPlanDoc.name} to ${newPlan.name}.`,
    });

    return NextResponse.json({
      success: true,
      plan: { id: newPlan._id.toString(), name: newPlan.name, speed: newPlan.speed, speedUnit: newPlan.speedUnit },
      reason,
    });
  } catch (err) {
    console.error("[admin/users/:id/change-plan] error:", err);
    return NextResponse.json({ error: "Failed to change plan." }, { status: 500 });
  }
}