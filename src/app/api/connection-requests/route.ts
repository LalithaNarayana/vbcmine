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
      { success: true, connectionRequest },
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
