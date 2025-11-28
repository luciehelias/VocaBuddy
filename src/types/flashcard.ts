import { TWordCategory } from "./category";

export type TFlashcard = {
  _id: string;
  userId: string;
  nativeWord: string;
  translatedWord: string;
  targetLanguages: string;
  category: TWordCategory;
  exampleSentence?: string;
  imageUrl?: string;
  knowledgeScore: number;
  createdAt: string;
  updatedAt: string;
};

export type FlashcardState =
  | "answering"
  | "correct"
  | "incorrect"
  | "help-shown";
