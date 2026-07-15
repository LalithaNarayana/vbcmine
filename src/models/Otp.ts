import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export type OtpPurpose = "register" | "login" | "plan-request";

export interface IOtp extends Document {
  mobile: string;
  otpHash: string;
  purpose: OtpPurpose;
  verified: boolean;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
  compareOtp(candidate: string): Promise<boolean>;
}

const OtpSchema = new Schema<IOtp>(
  {
    mobile: { type: String, required: true, index: true, trim: true },
    otpHash: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["register", "login", "plan-request"],
      required: true,
    },
    verified: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Auto-delete expired OTP docs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

OtpSchema.methods.compareOtp = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.otpHash);
};

const Otp: Model<IOtp> =
  mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);

export default Otp;
