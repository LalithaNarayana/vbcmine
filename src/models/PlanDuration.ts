import mongoose, { Schema, Model, Document } from "mongoose";

export interface IPlanDuration extends Document {
  label: string; // e.g. "1 Month", "1 Year"
  months: number; // numeric duration used for sorting/logic
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanDurationSchema = new Schema<IPlanDuration>(
  {
    label: { type: String, required: true, trim: true },
    months: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PlanDuration: Model<IPlanDuration> =
  mongoose.models.PlanDuration ||
  mongoose.model<IPlanDuration>("PlanDuration", PlanDurationSchema);

export default PlanDuration;