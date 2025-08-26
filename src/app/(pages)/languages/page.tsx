"use client";
import Image from "next/image";
import Link from "next/link";
import Title from "@/ui/Title";
import { languages } from "@/data/languages";
import { useUserData } from "@/contexts/userContext";
import { IUser } from "@/app/types/user";
import { IFlashcard } from "@/app/types/flashcard";

const hasFlashcardsOfLanguage = (languageId: string, user: IUser) => {
  return user?.flashcards.some((flashcard: IFlashcard) => flashcard.targetLanguage === languageId);
};

export default function LanguagesPage() {
  const user = useUserData();
  const targetLanguage = user?.targetLanguage;
  const languagesToLearn = targetLanguage
    ? languages.filter((lang) => targetLanguage.includes(lang.code))
    : languages;

  if (languagesToLearn.length === 0) {
    return <div>Aucun langage à apprendre trouvé.</div>;
  }
  const handleLink = (langCode: string): string =>{
    if(user && hasFlashcardsOfLanguage(langCode, user)){
      return `/languages/${langCode}`
    }
    // return `/flashcards/create/${langCode}`
    return `/flashcards`
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Title>Sélectionnez un langage à apprendre :</Title>
      <div className="grid grid-cols-3 gap-8 mt-4">
        {languagesToLearn.map((lang) => (
          <Link
            href={handleLink(lang.code)}
            key={lang.id}
            className="flex flex-col gap-2 items-center p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-black cursor-pointer"
          >
            <Image
              src={lang.flagUrl}
              alt={`${lang.name} flag`}
              width={100}
              height={100}
            />
            <p className="text-lg">{lang.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
