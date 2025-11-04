import { Document, ObjectId } from "mongoose";
import { TFlashcard } from "./flashcard";
import { TLanguage } from "./language";

// User interface for the client-side
export interface IUser {
  clerkId: string;
  id: string;
  username: string;
  avatarUrl?: string;
  nativeLanguage?: TLanguage;
  targetLanguages?: TLanguage[];
  createdAt: string;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  flashcards: TFlashcard[];
}

// User interface sent to the database
export interface IUserDB extends Document {
  clerkId: string;
  username: string;
  avatarUrl?: string;
  nativeLanguage?: string;
  targetLanguages?: string[];
  createdAt: Date;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  flashcards?: ObjectId[];
}

// User interface response from MongoDB
export interface IUserDataResponse extends IUserDB {
  _id: ObjectId;
}
