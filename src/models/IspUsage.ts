import mongoose, { Schema, Model, Document } from "mongoose";

export interface IIspUsage extends Document {
  accountId: string;
  status: "active" | "inactive";
  dataUsedGb: number;
  dataLimitGb: number;
  lastSynced: Date;
  createdAt: Date;
  updatedAt: Date;
}

const IspUsageSchema = new Schema<IIspUsage>(
  {
    accountId: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    dataUsedGb: { type: Number, default: 0 },
    dataLimitGb: { type: Number, default: 1000 },
    lastSynced: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const IspUsage: Model<IIspUsage> =
  mongoose.models.IspUsage || mongoose.model<IIspUsage>("IspUsage", IspUsageSchema);

export default IspUsage;
