import mongoose, { Schema, Model, Document } from "mongoose";

export interface IPlanCategory extends Document {
  name: string; // e.g. "Broadband", "TV + Broadband Combo"
  icon: string; // kebab-case Lucide icon name
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanCategorySchema = new Schema<IPlanCategory>(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "wifi" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PlanCategory: Model<IPlanCategory> =
  mongoose.models.PlanCategory ||
  mongoose.model<IPlanCategory>("PlanCategory", PlanCategorySchema);

export default PlanCategory;