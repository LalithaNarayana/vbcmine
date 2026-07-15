import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBusinessService extends Document {
  name: string;
  slug: string;
  badge?: string; // e.g. "New", "Popular"
  tagline?: string;
  image: string;
  icon: string; // kebab-case Lucide icon name
  description: string; // CKEditor HTML
  bulletPoints: string[]; // line-by-line
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessServiceSchema = new Schema<IBusinessService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    badge: { type: String, default: "" },
    tagline: { type: String, default: "" },
    image: { type: String, default: "" },
    icon: { type: String, default: "briefcase" },
    description: { type: String, default: "" },
    bulletPoints: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BusinessService: Model<IBusinessService> =
  mongoose.models.BusinessService ||
  mongoose.model<IBusinessService>("BusinessService", BusinessServiceSchema);

export default BusinessService;