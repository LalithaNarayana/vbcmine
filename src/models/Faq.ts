import mongoose, { Schema, Model, Document } from "mongoose";

export interface IFaq extends Document {
  category: string;
  question: string;
  answer: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    category: { type: String, required: true, trim: true, default: "General" },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Faq: Model<IFaq> =
  mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);

export default Faq;