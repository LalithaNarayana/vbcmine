import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  image: string;
  ctaLabel?: string;
  ctaLink?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    image: { type: String, required: true },
    ctaLabel: { type: String, default: "" },
    ctaLink: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;