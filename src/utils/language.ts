import { LANGUAGES } from "@/const/languages";
import { TFlashcard } from "@/types/flashcard";
import { TLanguage } from "@/types/language";

export const getLanguageName = (code: string) => {
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language ? language.name : "Langue inconnue";
};

export const getUserTargetLanguageNames = (targetLanguages?: TLanguage[]) => {
  return targetLanguages?.map((l) => l.name) || [];
};

export const getExcludedLanguageNames = (nativeLanguage?: TLanguage, targetLanguages?: TLanguage[]) => {
  return [...targetLanguages?.map((l) => l.name) || [], nativeLanguage?.name].flat();
};

export const hasFlashcardsOfLanguage = (languageCode: string, flashcards: TFlashcard[]) => {
  return flashcards.some(
    (flashcard: TFlashcard) => flashcard.targetLanguages === languageCode
  );
};