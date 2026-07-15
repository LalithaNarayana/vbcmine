import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";
import "@/models/Plan";

export type PaymentPurpose = "new-connection" | "renewal";

export interface IPayment extends Document {
  user: Types.ObjectId; // ref User
  plan: Types.ObjectId; // ref Plan
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
    purpose: {
      type: String,
      enum: ["new-connection", "renewal"],
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
