import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { requireUser } from "@/lib/userAuth";

interface Params {
  params: Promise<{ id: string }>;
}

/** PATCH /api/notifications/:id — mark a single notification as read (scoped to the owner). */
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireUser();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    await connectDB();

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: session.userId },
      { $set: { read: true } },
      { new: true }
    );

    if (!notification) {
      return NextResponse.json({ error: "Notification not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, notification });
  } catch (err) {
    console.error("[notifications/:id] patch error:", err);
    return NextResponse.json({ error: "Failed to update notification." }, { status: 500 });
  }
}
