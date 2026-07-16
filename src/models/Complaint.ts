import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/User";

export interface IComplaint extends Document {
  user: Types.ObjectId; // ref User
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);

const Complaint: Model<IComplaint> =
  mongoose.models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
