import mongoose, { Schema, Model, Document } from "mongoose";

export type LegalPageType = "privacy" | "terms" | "refund";

export interface ILegalPage extends Document {
  type: LegalPageType;
  title: string;
  content: string; // CKEditor HTML
  createdAt: Date;
  updatedAt: Date;
}

const LegalPageSchema = new Schema<ILegalPage>(
  {
    type: { type: String, enum: ["privacy", "terms", "refund"], required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const LegalPage: Model<ILegalPage> =
  mongoose.models.LegalPage ||
  mongoose.model<ILegalPage>("LegalPage", LegalPageSchema);

const DEFAULT_TITLES: Record<LegalPageType, string> = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  refund: "Refund Policy",
};

/** Gets a legal page by type, creating an empty one on first run if missing. */
export async function getOrCreateLegalPage(type: LegalPageType): Promise<ILegalPage> {
  let page = await LegalPage.findOne({ type });
  if (!page) {
    page = await LegalPage.create({ type, title: DEFAULT_TITLES[type], content: "" });
  }
  return page;
}

export default LegalPage;