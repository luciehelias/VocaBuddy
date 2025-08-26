"use client";
import Title from "@/ui/Title";
import { languages } from "@/data/languages";
import { useUserData } from "@/contexts/userContext";
import { useTargetLanguages } from "@/hooks/useTargetLanguages";
import LanguageAddCard from "@/components/pages/languages/LanguageAddCard";
import LanguageCard from "@/components/pages/languages/LanguageCard";

export default function LanguagesPage() {
  const user = useUserData();
  const { targetLanguages, addTargetLanguage } = useTargetLanguages(
    user?.targetLanguage ?? []
  );

  const languagesToLearn = targetLanguages.length
    ? languages.filter((language) => targetLanguages.includes(language.name))
    : [];

  if (languagesToLearn.length === 0) {
    return (
      <LanguageAddCard
        targetLanguages={targetLanguages}
        AddTargetLanguage={addTargetLanguage}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Title>Sélectionnez un langage à apprendre :</Title>
      <div className="flex flex-wrap gap-8 mt-4">
        {languagesToLearn.map((language) => (
          <LanguageCard
            key={language.code}
            name={language.name}
            flagUrl={language.flagUrl}
          />
        ))}
        <LanguageAddCard
          targetLanguages={targetLanguages}
          AddTargetLanguage={addTargetLanguage}
        />
      </div>
    </div>
  );
}
