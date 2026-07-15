import mongoose, { Schema, Model, Document } from "mongoose";

export interface ISalesCity extends Document {
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SalesCitySchema = new Schema<ISalesCity>(
  {
    name: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SalesCity: Model<ISalesCity> =
  mongoose.models.SalesCity ||
  mongoose.model<ISalesCity>("SalesCity", SalesCitySchema);

export default SalesCity;