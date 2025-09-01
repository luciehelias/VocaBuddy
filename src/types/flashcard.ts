import { TWordCategory } from "./categories";

export interface IFlashcard {
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
}
