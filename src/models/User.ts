import mongoose, { Schema, Model, Document, Types } from "mongoose";

// A single connection/account belonging to a user. A mobile number (User)
// can hold more than one of these — e.g. a customer who already has an
// active connection requests a brand-new one for a second location. Each
// entry mirrors one "assigned" ConnectionRequest.
export interface IUserAccount {
  _id: Types.ObjectId;
  accountId: string;
  connectionStatus: "active" | "inactive";
  connectionRequest: Types.ObjectId; // ref ConnectionRequest
  plan: Types.ObjectId | null; // ref Plan
  city: string;
  createdAt: Date;
}

export interface IUser extends Document {
  name: string;
  mobile: string; // 10-digit, unique
  // "Currently selected" account — every account-scoped feature (ISP
  // status, payments, renewals, upgrades) reads/writes through these two
  // fields. Switching accounts (see /api/user/switch-account) just repoints
  // them at a different entry in `accounts` below, so the rest of the app
  // doesn't need to know about multi-account at all.
  accountId: string | null; // set by admin once connection is provisioned
  connectionStatus: "pending" | "active" | "inactive";
  // Every connection this mobile number has ever had assigned, active or
  // not. Powers the dashboard's account switcher.
  accounts: IUserAccount[];
  createdAt: Date;
  updatedAt: Date;
}

const UserAccountSchema = new Schema<IUserAccount>(
  {
    accountId: { type: String, required: true },
    connectionStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    connectionRequest: { type: Schema.Types.ObjectId, ref: "ConnectionRequest", required: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", default: null },
    city: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

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
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },

    accounts: { type: [UserAccountSchema], default: [] },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
