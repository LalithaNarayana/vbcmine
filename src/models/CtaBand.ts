import mongoose, { Schema, Model, Document } from "mongoose";

export interface ICtaBand extends Document {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const CtaBandSchema = new Schema<ICtaBand>(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    ctaLabel: { type: String, default: "Get Connected" },
    ctaLink: { type: String, default: "/contact" },
  },
  { timestamps: true }
);

const CtaBand: Model<ICtaBand> =
  mongoose.models.CtaBand || mongoose.model<ICtaBand>("CtaBand", CtaBandSchema);

// CtaBand is a singleton — always exactly one document, like Settings.
export async function getOrCreateCtaBand(): Promise<ICtaBand> {
  let band = await CtaBand.findOne();
  if (!band) {
    band = await CtaBand.create({});
  }
  return band;
}

export default CtaBand;