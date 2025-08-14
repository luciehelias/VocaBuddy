import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
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
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  avatarUrl: { type: String, default: "" },
  nativeLanguage: { type: String, required: true },
  targetLanguage: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  settings: {
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notifications: { type: Boolean, default: true },
  },
});

// Évite la recréation du modèle en dev
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
