"use client";

import Title from "@/ui/Title";
import { languages } from "@/data/languages";
import { IFlashcard } from "@/types/flashcard";
import { useTargetLanguages } from "@/hooks/useTargetLanguages";
import LanguageAddCard from "@/components/pages/languages/LanguageAddCard";
import LanguageCard from "@/components/pages/languages/LanguageCard";
import { IUser } from "@/types/user";

const hasFlashcardsOfLanguage = (languageCode: string, user: IUser) => {
  return user?.flashcards.some(
    (flashcard: IFlashcard) => flashcard.targetLanguage === languageCode
  );
};

const getHref = (langCode: string, user: IUser | null): string => {
  if (user && hasFlashcardsOfLanguage(langCode, user)) {
    return `/language/${langCode.toLowerCase()}`;
  }
  return `/flashcards/create/${langCode.toLowerCase()}`
};

export default function LanguagesPage({ user }: { user: IUser | null }) {
  const { targetLanguages, addTargetLanguage } = useTargetLanguages(
    user?.targetLanguage
  );

  const languagesToLearn = targetLanguages.length
    ? languages.filter((language) => targetLanguages.includes(language.code))
    : [];

  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <Title>Sélectionnez un langage à apprendre :</Title>
      <div className="flex flex-wrap gap-4 max-w-4xl justify-center">
        {languagesToLearn.map((language) => (
          <LanguageCard
            key={language.code}
            name={language.name}
            flagUrl={language.flagUrl}
            href={getHref(language.code, user)}
          />
        ))}
        <LanguageAddCard
          targetLanguages={targetLanguages}
          addTargetLanguage={addTargetLanguage}
        />
      </div>
    </div>
  );
}
