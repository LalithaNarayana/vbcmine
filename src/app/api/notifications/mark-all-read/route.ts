import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { requireUser } from "@/lib/userAuth";

/** POST /api/notifications/mark-all-read — marks all of the user's notifications as read. */
export async function POST() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    await Notification.updateMany(
      { user: session.userId, read: false },
      { $set: { read: true } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[notifications/mark-all-read] error:", err);
    return NextResponse.json({ error: "Failed to update notifications." }, { status: 500 });
  }
}
