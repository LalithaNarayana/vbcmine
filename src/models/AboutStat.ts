import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAboutStat extends Document {
  value: string; // e.g. "14+", "30K+", "640 Km"
  label: string; // e.g. "Years of Service"
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AboutStatSchema = new Schema<IAboutStat>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AboutStat: Model<IAboutStat> =
  mongoose.models.AboutStat ||
  mongoose.model<IAboutStat>("AboutStat", AboutStatSchema);

export default AboutStat;