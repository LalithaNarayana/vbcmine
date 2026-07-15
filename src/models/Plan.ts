import mongoose, { Schema, Model, Document, Types } from "mongoose";

// Side-effect imports — ensure referenced models are registered with Mongoose
// before any .populate() call on Plan, regardless of which route runs first.
import "@/models/PlanBullet";
import "@/models/PlanDuration";
import "@/models/PlanCategory";

export interface IPlanPrice {
  duration: Types.ObjectId; // ref PlanDuration
  price: number;
}

export interface IPlanOtt {
  name: string;
  image: string; // S3 WebP url
}

export interface IPlan extends Document {
  name: string;
  category: Types.ObjectId; // ref PlanCategory
  speed: number;
  speedUnit: "Mbps" | "Gbps";
  prices: IPlanPrice[];
  bullets: Types.ObjectId[]; // ref PlanBullet
  ottList: IPlanOtt[];
  mostPopular: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanPriceSchema = new Schema<IPlanPrice>(
  {
    duration: { type: Schema.Types.ObjectId, ref: "PlanDuration", required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const PlanOttSchema = new Schema<IPlanOtt>(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const PlanSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "PlanCategory", required: true },
    speed: { type: Number, required: true },
    speedUnit: { type: String, enum: ["Mbps", "Gbps"], default: "Mbps" },
    prices: { type: [PlanPriceSchema], default: [] },
    bullets: [{ type: Schema.Types.ObjectId, ref: "PlanBullet" }],
    ottList: { type: [PlanOttSchema], default: [] },
    mostPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Plan: Model<IPlan> =
  mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);

export default Plan;