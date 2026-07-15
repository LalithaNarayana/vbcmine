import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IHomePlansSection extends Document {
  category?: Types.ObjectId; // ref PlanCategory — which category's plans to feature on Home
  createdAt: Date;
  updatedAt: Date;
}

const HomePlansSectionSchema = new Schema<IHomePlansSection>(
  {
    category: { type: Schema.Types.ObjectId, ref: "PlanCategory" },
  },
  { timestamps: true }
);

const HomePlansSection: Model<IHomePlansSection> =
  mongoose.models.HomePlansSection ||
  mongoose.model<IHomePlansSection>("HomePlansSection", HomePlansSectionSchema);

// Singleton, like Settings and CtaBand.
export async function getOrCreateHomePlansSection(): Promise<IHomePlansSection> {
  let doc = await HomePlansSection.findOne();
  if (!doc) {
    doc = await HomePlansSection.create({});
  }
  return doc;
}

export default HomePlansSection;