"use client";
import Title from "@/ui/Title";
import { languages } from "@/data/languages";
import Image from "next/image";
import { useUserData } from "@/contexts/userContext";

export default function LanguagesPage() {
    const user = useUserData();
    const targetLanguage = user?.targetLanguage;
    const languagesToLearn = targetLanguage ? languages.filter(lang => targetLanguage.includes(lang.code)) : languages;

    if (languagesToLearn.length === 0) {
      return <div>Aucun langage à apprendre trouvé.</div>;
    }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Title>Sélectionnez un langage à apprendre :</Title>
      <div className="grid grid-cols-3 gap-8 mt-4">
        {languagesToLearn.map((lang) => (
          <div className="flex flex-col gap-2 items-center p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-black cursor-pointer" key={lang.code}>
            <Image src={lang.flagUrl} alt={`${lang.name} flag`} width={100} height={100} />
            <p className="text-lg">{lang.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
