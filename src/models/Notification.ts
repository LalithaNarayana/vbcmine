import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";

export type NotificationType = "renewal" | "activation" | "payment" | "broadcast" | "direct" | "not-serviceable";

export interface INotification extends Document {
  user: Types.ObjectId; // ref User — every notification is a per-user row
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  // Set for system-generated notifications (renewal/activation/payment) so the
  // same event never creates a duplicate row for the same user.
  dedupeKey: string | null;
  // Set for admin-sent notifications (broadcast/direct) so a single "send"
  // action — which fans out into one row per recipient — can still be
  // displayed as one entry in the admin's "sent" history.
  batchId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["renewal", "activation", "payment", "broadcast", "direct", "not-serviceable"],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
    dedupeKey: { type: String, default: null },
    batchId: { type: String, default: null },
  },
  { timestamps: true }
);

// Prevent the same system event from generating duplicate notifications
// for the same user (e.g. renewal-due re-computed on every dashboard load).
NotificationSchema.index(
  { user: 1, dedupeKey: 1 },
  { unique: true, partialFilterExpression: { dedupeKey: { $type: "string" } } }
);

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
