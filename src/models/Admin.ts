import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      trim: true,
      default: "Admin",
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;