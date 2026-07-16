import Notification, { NotificationType } from "@/models/Notification";
import { Types } from "mongoose";

/**
 * Creates a system-generated notification for a user, unless one with the
 * same dedupeKey already exists for that user (e.g. re-computing "renewal
 * due" on every dashboard load shouldn't spam duplicate rows).
 */
export async function notifyUserOnce(
  userId: string | Types.ObjectId,
  type: NotificationType,
  title: string,
  message: string,
  dedupeKey: string
): Promise<void> {
  try {
    await Notification.updateOne(
      { user: userId, dedupeKey },
      { $setOnInsert: { user: userId, type, title, message, read: false, dedupeKey } },
      { upsert: true }
    );
  } catch {
    // Duplicate-key races are expected/harmless under the unique index — ignore.
  }
}
