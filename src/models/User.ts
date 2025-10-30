import mongoose, { Schema, Model } from "mongoose";
import { IUserDB } from "@/types/user";

const defaultAvatarUrl =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const userSchema = new Schema<IUserDB>({
  clerkId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true, trim: true },
  avatarUrl: { type: String, default: defaultAvatarUrl },
  nativeLanguage: { type: String, default: "" },
  targetLanguages: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  settings: {
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notifications: { type: Boolean, default: true },
  },
  flashcards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flashcard",
    },
  ],
});

// Reuse the existing model if it has already been compiled by Mongoose.
// This prevents the "OverwriteModelError" that can happen during hot-reloading in development.
export const User: Model<IUserDB> =
  mongoose.models.User || mongoose.model<IUserDB>("User", userSchema);
