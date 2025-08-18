import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFlashcard extends Document {
  userId: mongoose.Types.ObjectId;
  nativeWord: string;
  translatedWord: string;
  targetLanguage: string;
  category: string;
  exampleSentence?: string;
  imageUrl?: string;
  knowledgeScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const flashcardSchema = new Schema<IFlashcard>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nativeWord: {
      type: String,
      required: true,
      trim: true,
    },
    translatedWord: {
      type: String,
      required: true,
      trim: true,
    },
    targetLanguage: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    exampleSentence: {
      type: String,
      trim: true,
      default: "",
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    knowledgeScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
  },
  // automatically manage createdAt and updatedAt timestamps
  { timestamps: true }
);

// Reuse the existing model if it has already been compiled by Mongoose.
// This prevents the "OverwriteModelError" that can happen during hot-reloading in development.
export const Flashcard: Model<IFlashcard> =
  mongoose.models.Flashcard ||
  mongoose.model<IFlashcard>("Flashcard", flashcardSchema);
