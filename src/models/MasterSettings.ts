import mongoose, { Schema, Model, Document } from "mongoose";

export interface IMasterSettings extends Document {
  gstPercent: number;
  createdAt: Date;
  updatedAt: Date;
}

const MasterSettingsSchema = new Schema<IMasterSettings>(
  {
    gstPercent: { type: Number, default: 18, min: 0, max: 100 },
  },
  { timestamps: true }
);

const MasterSettings: Model<IMasterSettings> =
  mongoose.models.MasterSettings ||
  mongoose.model<IMasterSettings>("MasterSettings", MasterSettingsSchema);

/**
 * Returns the single MasterSettings document, creating a default one
 * (18% GST) on first run if it doesn't exist yet.
 */
export async function getOrCreateMasterSettings(): Promise<IMasterSettings> {
  let settings = await MasterSettings.findOne();
  if (!settings) {
    settings = await MasterSettings.create({});
  }
  return settings;
}

export default MasterSettings;
