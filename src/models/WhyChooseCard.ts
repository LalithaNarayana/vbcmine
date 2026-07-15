import mongoose, { Schema, Model, Document } from "mongoose";

export interface IWhyChooseCard extends Document {
  title: string;
  description: string;
  icon: string;
  image?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const WhyChooseCardSchema = new Schema<IWhyChooseCard>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "shield-check" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const WhyChooseCard: Model<IWhyChooseCard> =
  mongoose.models.WhyChooseCard ||
  mongoose.model<IWhyChooseCard>("WhyChooseCard", WhyChooseCardSchema);

export default WhyChooseCard;