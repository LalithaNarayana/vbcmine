import mongoose, { Schema, Model, Document } from "mongoose";

export interface IPlanBullet extends Document {
  text: string; // e.g. "Free Installation", "No Data Cap"
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanBulletSchema = new Schema<IPlanBullet>(
  {
    text: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PlanBullet: Model<IPlanBullet> =
  mongoose.models.PlanBullet ||
  mongoose.model<IPlanBullet>("PlanBullet", PlanBulletSchema);

export default PlanBullet;