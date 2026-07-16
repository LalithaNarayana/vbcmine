import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { requireUser } from "@/lib/userAuth";

/** GET /api/notifications — logged-in user's notifications, newest first, plus unread count. */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const [notifications, unreadCount] = await Promise.all([
      Notification.find({ user: session.userId }).sort({ createdAt: -1 }).limit(50).lean(),
      Notification.countDocuments({ user: session.userId, read: false }),
    ]);

    return NextResponse.json({ notifications, unreadCount });
  } catch (err) {
    console.error("[notifications] list error:", err);
    return NextResponse.json({ error: "Failed to load notifications." }, { status: 500 });
  }
}
