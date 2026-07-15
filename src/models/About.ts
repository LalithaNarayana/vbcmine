import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAbout extends Document {
  aboutVbc: {
    mainTitle: string;
    titlePart1: string;
    titlePart2: string;
    titlePart3: string;
    description: string;
  };
  companyProfile: {
    mainTitle: string;
    titlePart1: string;
    titlePart2: string;
    description: string; // CKEditor HTML
  };
  whySection: {
    mainTitle: string;
    titlePart1: string;
    titlePart2: string;
    description: string; // CKEditor HTML
  };
  successStory: {
    mainTitle: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
  };
  mission: { description: string };
  vision: { description: string };
  values: { description: string };
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    aboutVbc: {
      mainTitle: { type: String, default: "About VBC" },
      titlePart1: { type: String, default: "" },
      titlePart2: { type: String, default: "" },
      titlePart3: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    companyProfile: {
      mainTitle: { type: String, default: "Company Profile" },
      titlePart1: { type: String, default: "" },
      titlePart2: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    whySection: {
      mainTitle: { type: String, default: "WHY" },
      titlePart1: { type: String, default: "" },
      titlePart2: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    successStory: {
      mainTitle: { type: String, default: "Our Success Story" },
      titlePart1: { type: String, default: "" },
      titlePart2: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    mission: { description: { type: String, default: "" } },
    vision: { description: { type: String, default: "" } },
    values: { description: { type: String, default: "" } },
  },
  { timestamps: true }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export async function getOrCreateAbout(): Promise<IAbout> {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({});
  }
  return about;
}

export default About;