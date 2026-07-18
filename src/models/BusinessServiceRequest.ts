import mongoose, { Schema, Model, Document, Types } from "mongoose";

import "@/models/BusinessService";

export interface IBusinessServiceRequest extends Document {
  businessService: Types.ObjectId; // ref BusinessService
  businessServiceName: string; // snapshot of the name at submit time
  name: string;
  city: string;
  address: string;
  mobile: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const BusinessServiceRequestSchema = new Schema<IBusinessServiceRequest>(
  {
    businessService: { type: Schema.Types.ObjectId, ref: "BusinessService", required: true },
    businessServiceName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, default: "", trim: true },
    mobile: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const BusinessServiceRequest: Model<IBusinessServiceRequest> =
  mongoose.models.BusinessServiceRequest ||
  mongoose.model<IBusinessServiceRequest>(
    "BusinessServiceRequest",
    BusinessServiceRequestSchema
  );

export default BusinessServiceRequest;
