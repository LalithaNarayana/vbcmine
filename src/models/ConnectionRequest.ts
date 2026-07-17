import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";
import "@/models/Plan";
import "@/models/Payment";

export interface IConnectionRequest extends Document {
  user: Types.ObjectId; // ref User
  name: string;
  mobile: string;
  city: string;
  address: string;
  landmark: string;
  plan: Types.ObjectId; // ref Plan
  status: "pending" | "payment_pending" | "payment_done" | "assigned" | "not_serviceable";
  // Set once an admin verifies feasibility and sends a payment link —
  // points at the Payment doc the user needs to pay off before an
  // Account ID can be assigned.
  payment: Types.ObjectId | null; // ref Payment
  accountId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ConnectionRequestSchema = new Schema<IConnectionRequest>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    landmark: { type: String, required: true, trim: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    status: {
      type: String,
      enum: ["pending", "payment_pending", "payment_done", "assigned", "not_serviceable"],
      default: "pending",
    },
    payment: { type: Schema.Types.ObjectId, ref: "Payment", default: null },
    accountId: { type: String, default: null },
  },
  { timestamps: true }
);

const ConnectionRequest: Model<IConnectionRequest> =
  mongoose.models.ConnectionRequest ||
  mongoose.model<IConnectionRequest>(
    "ConnectionRequest",
    ConnectionRequestSchema
  );

export default ConnectionRequest;
