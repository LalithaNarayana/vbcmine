import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { requireAdmin } from "@/lib/auth";

/** GET /api/admin/notifications — admin-sent notification history, grouped by send batch. */
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    await connectDB();

    const batches = await Notification.aggregate([
      { $match: { batchId: { $ne: null } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$batchId",
          type: { $first: "$type" },
          title: { $first: "$title" },
          message: { $first: "$message" },
          createdAt: { $first: "$createdAt" },
          recipientCount: { $sum: 1 },
          readCount: { $sum: { $cond: ["$read", 1, 0] } },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 50 },
    ]);

    return NextResponse.json(batches);
  } catch (err) {
    console.error("[admin/notifications] list error:", err);
    return NextResponse.json({ error: "Failed to load notification history." }, { status: 500 });
  }
}
