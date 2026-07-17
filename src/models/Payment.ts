import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";
import "@/models/Plan";
import "@/models/ConnectionRequest";

export type PaymentPurpose = "new-connection" | "renewal" | "upgrade";

export interface IPayment extends Document {
  user: Types.ObjectId; // ref User
  plan: Types.ObjectId; // ref Plan
  // Which of the user's connections/accounts this payment is for. Null on
  // older records created before multi-account support existed.
  connectionRequest: Types.ObjectId | null; // ref ConnectionRequest
  purpose: PaymentPurpose;
  baseAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
  status: "created" | "success" | "failed";
  provider: string; // e.g. "mock", "razorpay"
  providerOrderId: string;
  providerPaymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    connectionRequest: { type: Schema.Types.ObjectId, ref: "ConnectionRequest", default: null },
    purpose: {
      type: String,
      enum: ["new-connection", "renewal", "upgrade"],
      default: "renewal",
    },
    baseAmount: { type: Number, required: true },
    gstPercent: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created",
    },
    provider: { type: String, default: "mock" },
    providerOrderId: { type: String, required: true },
    providerPaymentId: { type: String, default: null },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
