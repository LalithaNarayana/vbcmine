import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";

const sendSchema = z.object({
  target: z.enum(["all", "user"]),
  userId: z.string().optional(),
  title: z.string().trim().min(2, "Please enter a title."),
  message: z.string().trim().min(2, "Please enter a message."),
});

/** POST /api/admin/notifications/send — admin pushes a message to one user or broadcasts to all. */
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = sendSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    const { target, userId, title, message } = parsed.data;

    if (target === "user" && !userId) {
      return NextResponse.json({ error: "Please select a user." }, { status: 400 });
    }

    await connectDB();

    let recipientIds: string[];
    if (target === "all") {
      const users = await User.find({}, "_id").lean();
      recipientIds = users.map((u) => u._id.toString());
    } else {
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }
      recipientIds = [user._id.toString()];
    }

    if (recipientIds.length === 0) {
      return NextResponse.json({ error: "No recipients found." }, { status: 400 });
    }

    const batchId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const type = target === "all" ? "broadcast" : "direct";

    await Notification.insertMany(
      recipientIds.map((uid) => ({
        user: uid,
        type,
        title,
        message,
        read: false,
        batchId,
      }))
    );

    return NextResponse.json({ success: true, recipientCount: recipientIds.length }, { status: 201 });
  } catch (err) {
    console.error("[admin/notifications/send] error:", err);
    return NextResponse.json({ error: "Failed to send notification." }, { status: 500 });
  }
}
