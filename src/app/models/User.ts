import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string[];
  createdAt: Date;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true, trim: true },
  avatarUrl: { type: String, default: "" },
  nativeLanguage: { type: String, required: true },
  targetLanguage: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  settings: {
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notifications: { type: Boolean, default: true },
  },
});

// Reuse the existing model if it has already been compiled by Mongoose.
// This prevents the "OverwriteModelError" that can happen during hot-reloading in development.
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
