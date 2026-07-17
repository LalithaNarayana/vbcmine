import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import ConnectionRequest from "@/models/ConnectionRequest";
import User from "@/models/User";
import Plan from "@/models/Plan";
import { requireUser } from "@/lib/userAuth";
import { requireAdmin } from "@/lib/auth";

const createSchema = z.object({
  planId: z.string().min(1, "Please select a plan."),
  city: z.string().trim().min(1, "Please select your city."),
  address: z.string().trim().min(5, "Please enter your full address."),
  landmark: z.string().trim().min(2, "Please enter a nearby landmark."),
});

/** POST /api/connection-requests — logged-in user submits a new connection request. */
export async function POST(req: NextRequest) {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { planId, city, address, landmark } = parsed.data;

    await connectDB();

    const [user, plan] = await Promise.all([
      User.findById(session.userId),
      Plan.findById(planId),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    if (!plan) {
      return NextResponse.json({ error: "Selected plan was not found." }, { status: 404 });
    }

    // Only one connection request may be "in flight" for a user at a time.
    // Once an admin verifies feasibility and pushes a payment link
    // (payment_pending) — or the user has already paid (payment_done) —
    // the request is locked in and can no longer be swapped for a
    // different plan; the user must complete/await that request first.
    const existing = await ConnectionRequest.findOne({
      user: user._id,
      status: { $in: ["pending", "payment_pending", "payment_done"] },
    })
      .sort({ createdAt: -1 })
      .populate({ path: "plan", select: "name speed speedUnit" });

    if (existing) {
      if (existing.status !== "pending") {
        const existingPlan = existing.plan as unknown as { name: string; speed: number; speedUnit: string } | null;
        return NextResponse.json({
          success: false,
          state: "payment-required",
          message: `Your requested connection for ${
            existingPlan ? `${existingPlan.name} (${existingPlan.speed} ${existingPlan.speedUnit})` : "your selected plan"
          } has already been verified and a payment link has been sent. Please complete that payment to get your connection.`,
          connectionRequest: existing,
        });
      }

      const existingPlanId =
        typeof existing.plan === "string" ? existing.plan : (existing.plan as { _id: { toString(): string } })._id.toString();

      if (existingPlanId === planId) {
        return NextResponse.json({
          success: false,
          state: "duplicate",
          message: "We've already received your request for this plan and it's currently in process. Our sales team will reach out to you shortly.",
          connectionRequest: existing,
        });
      }

      // Different plan while still pending review — replace the existing
      // record instead of creating a second one, so only one connection
      // request ever exists per user until it's verified.
      existing.plan = plan._id;
      existing.city = city;
      existing.address = address;
      existing.landmark = landmark;
      existing.name = user.name;
      existing.mobile = user.mobile;
      await existing.save();

      const populated = await ConnectionRequest.findById(existing._id).populate({
        path: "plan",
        select: "name speed speedUnit",
      });

      return NextResponse.json(
        { success: true, state: "replaced", connectionRequest: populated },
        { status: 200 }
      );
    }

    const connectionRequest = await ConnectionRequest.create({
      user: user._id,
      name: user.name,
      mobile: user.mobile,
      city,
      address,
      landmark,
      plan: plan._id,
      status: "pending",
      accountId: null,
    });

    return NextResponse.json(
      { success: true, state: "created", connectionRequest },
      { status: 201 }
    );
  } catch (err) {
    console.error("[connection-requests] create error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/** GET /api/connection-requests — admin lists all connection requests, newest first. */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const requests = await ConnectionRequest.find()
      .populate({ path: "plan", select: "name speed speedUnit" })
      .populate({ path: "payment", select: "totalAmount status" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(requests);
  } catch (err) {
    console.error("[connection-requests] list error:", err);
    return NextResponse.json(
      { error: "Failed to load connection requests." },
      { status: 500 }
    );
  }
}
