import Title from "@/ui/Title";
import { TFlashcard } from "@/types/flashcard";
import LanguageAddCard from "@/components/card/LanguageAddCard";
import LanguageCard from "@/components/card/LanguageCard";
import { IUser } from "@/types/user";
import { hasFlashcardsOfLanguage } from "@/utils/language";
import { updateUserLanguage } from "@/app/actions/user";

export default function LanguagesPage({ user }: { user: IUser }) {

  console.log("User in LanguagesPage:", user);
    const getHref = (langCode: string, flashcards: TFlashcard[]): string => {
      return hasFlashcardsOfLanguage(langCode, flashcards)
      ? `/language/${langCode}`
      : `/flashcards/${langCode}/create`;
  };

  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <Title>Sélectionnez un langage à apprendre :</Title>
      <div className="flex flex-wrap gap-4 max-w-4xl justify-center">
        {user?.targetLanguages?.map((language) => (
          <LanguageCard
            key={language.code}
            name={language.name}
            flagUrl={language.flagUrl}
            href={getHref(language.code, user.flashcards)}
          />
        ))}
        <LanguageAddCard user={user} updateUserLanguage={updateUserLanguage} />
      </div>
    </div>
  );
}
