import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";
import "@/models/Plan";

export type SubscriptionChangeReason =
  | "new-connection"
  | "renewal"
  | "upgrade"
  | "downgrade"
  | "admin-change";

export interface ISubscriptionHistory extends Document {
  user: Types.ObjectId; // ref User
  oldPlan: Types.ObjectId | null; // ref Plan — null for the very first connection
  newPlan: Types.ObjectId; // ref Plan
  reason: SubscriptionChangeReason;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionHistorySchema = new Schema<ISubscriptionHistory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    oldPlan: { type: Schema.Types.ObjectId, ref: "Plan", default: null },
    newPlan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    reason: {
      type: String,
      enum: ["new-connection", "renewal", "upgrade", "downgrade", "admin-change"],
      required: true,
    },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

const SubscriptionHistory: Model<ISubscriptionHistory> =
  mongoose.models.SubscriptionHistory ||
  mongoose.model<ISubscriptionHistory>("SubscriptionHistory", SubscriptionHistorySchema);

export default SubscriptionHistory;
