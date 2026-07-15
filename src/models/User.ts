import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  mobile: string; // 10-digit, unique
  accountId: string | null; // set by admin once connection is provisioned
  connectionStatus: "pending" | "active";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    // No `default: null` here on purpose: with a sparse unique index, Mongo
    // only skips documents where the field is *absent*. A default of null
    // makes every document explicitly have accountId: null, so the sparse
    // index still enforces uniqueness on that null value and the 2nd+ user
    // created without an accountId throws E11000. Leaving it unset (undefined)
    // until an admin assigns one lets sparse+unique work as intended.
    accountId: { type: String, unique: true, sparse: true },

    connectionStatus: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
