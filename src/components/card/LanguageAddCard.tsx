"use client";

import { useState } from "react";
import { Button, Dropdown } from "@/ui";
import { LANGUAGES } from "@/const/languages";
import { getExcludedLanguageNames } from "@/utils/language";
import { CirclePlus } from "lucide-react";
import { IUser } from "@/types/user";

export default function LanguageAddCard({
  user,
  updateUserLanguage,
}: {
  user: IUser;
  updateUserLanguage: (
    languageCode: string,
    isNative?: boolean
  ) => Promise<any>;
}) {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");
  const excludedLanguages = getExcludedLanguageNames(
    user?.nativeLanguage,
    user?.targetLanguages
  );

  const handleSubmit = async () => {
    if (selectedLang) {
      await updateUserLanguage(
        LANGUAGES.find((e) => e.name === selectedLang)!.code
      );
      setSelectedLang("");
      setShowSelect(false);
    }
  };

  return (
    <div className="language-card">
      {!showSelect && (
        <>
          <CirclePlus
            size={50}
            className="flex-1 flex items-center justify-center"
            onClick={() => setShowSelect(true)}
          />
          <p className="text-lg text-center">Ajoute une autre langue</p>
        </>
      )}
      {showSelect && (
        <div className="flex flex-col items-center gap-6">
          {selectedLang && (
            <img
              src={LANGUAGES.find((l) => l.name === selectedLang)?.flagUrl}
              alt={`${selectedLang} flag`}
              className="w-8 h-8 object-contain"
            />
          )}
          <Dropdown
            options={LANGUAGES.filter(
              (l) => !excludedLanguages.includes(l.name)
            ).map((l) => l.name)}
            value={selectedLang}
            onChange={setSelectedLang}
            placeholder="Ajoute une langue"
          />
          <Button variant="submit" onClick={handleSubmit}>
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}
