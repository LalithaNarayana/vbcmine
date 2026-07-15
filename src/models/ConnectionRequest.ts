import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";
import "@/models/Plan";

export interface IConnectionRequest extends Document {
  user: Types.ObjectId; // ref User
  name: string;
  mobile: string;
  address: string;
  landmark: string;
  plan: Types.ObjectId; // ref Plan
  status: "pending" | "assigned";
  accountId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ConnectionRequestSchema = new Schema<IConnectionRequest>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    landmark: { type: String, required: true, trim: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    status: {
      type: String,
      enum: ["pending", "assigned"],
      default: "pending",
    },
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
