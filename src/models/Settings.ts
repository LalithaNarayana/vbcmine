import mongoose, { Schema, Model, Document } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  logo: string;
  favicon: string;
  metaTitle: string;
  metaDescription: string;
  contact1: string;
  contact2: string;
  whatsappNumber: string;
  mail1: string;
  mail2: string;
  address: string; // CKEditor HTML
  workingHours: string; // CKEditor HTML
  topBarTitle: string;
  topBarNumber: string;
  footerDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    contact1: { type: String, default: "" },
    contact2: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    mail1: { type: String, default: "" },
    mail2: { type: String, default: "" },
    address: { type: String, default: "" },
    workingHours: { type: String, default: "" },
    topBarTitle: { type: String, default: "👉🏻 Click here to book connection online" },
    topBarNumber: { type: String, default: "(0891) 6677-123" },
    footerDescription: {
      type: String,
      default:
        "VBC delivers reliable fiber broadband, TV and enterprise network services with local support, transparent pricing and fast installation.",
    },
  },
  { timestamps: true }
);

// Settings is a singleton — always exactly one document.
const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

/**
 * Returns the single Settings document, creating an empty one on first
 * run if it doesn't exist yet (admin fills it in afterwards — no dummy
 * content is seeded here per project requirements).
 */
export async function getOrCreateSettings(): Promise<ISettings> {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
}

export default Settings;