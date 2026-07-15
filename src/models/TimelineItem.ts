import mongoose, { Schema, Model, Document } from "mongoose";

export interface ITimelineItem extends Document {
  year: string; // e.g. "2012"
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TimelineItemSchema = new Schema<ITimelineItem>(
  {
    year: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TimelineItem: Model<ITimelineItem> =
  mongoose.models.TimelineItem ||
  mongoose.model<ITimelineItem>("TimelineItem", TimelineItemSchema);

export default TimelineItem;