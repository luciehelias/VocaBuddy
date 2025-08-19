export interface IFlashcard {
  _id: string;
  userId: string;
  nativeWord: string;
  translatedWord: string;
  targetLanguage: string;
  category: string;
  exampleSentence?: string;
  imageUrl?: string;
  knowledgeScore: number;
  createdAt: string;
  updatedAt: string;
}
