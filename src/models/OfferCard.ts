import mongoose, { Schema, Model, Document } from "mongoose";

export interface IOfferCard extends Document {
  title: string;
  description: string;
  badge: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const OfferCardSchema = new Schema<IOfferCard>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    badge: { type: String, default: "", trim: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const OfferCard: Model<IOfferCard> =
  mongoose.models.OfferCard ||
  mongoose.model<IOfferCard>("OfferCard", OfferCardSchema);

export default OfferCard;