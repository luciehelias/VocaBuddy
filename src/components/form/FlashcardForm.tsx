"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useFlashcards } from "@/hooks/useFlashcard";
import { useUserData } from "@/contexts/userContext";
import { CATEGORIES } from "@/const/flashcards";
import { LANGUAGES } from "@/const/languages";
import { TWordCategory } from "@/types/categories";
import Button from "@/ui/Button";
import Dropdown from "@/ui/Dropdown";
import Title from "@/ui/Title";
import LanguageInputWithFlag from "@/ui/LanguageInputWithFlag";

export default function FlashcardForm({
  languageCode,
  learningLanguage,
}: {
  languageCode: string;
  learningLanguage: string;
}) {
  const { createFlashcard } = useFlashcards();
  const user = useUserData();

  const [nativeWord, setNativeWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [category, setCategory] = useState<TWordCategory>("Autre");
  const [showSelect, setShowSelect] = useState(false);

  const nativeLanguageName =
    LANGUAGES.find((lang) => lang.code === user?.nativeLanguage)?.name ??
    "langue inconnue";

  const learningLanguageCode =
    LANGUAGES.find((lang) => lang.name === learningLanguage)?.code ?? "";

  const handleCreate = () => {
    if (!nativeWord || !translatedWord) {
      toast.error("Oups, je pense qu'il te manque des infos 😉");
      return;
    }
    createFlashcard({
      nativeWord,
      translatedWord,
      targetLanguages: languageCode,
      category,
    });
    setNativeWord("");
    setTranslatedWord("");
    setCategory("Autre");
    toast.success("Super, un nouveau mot à apprendre 💪 !");
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-8 items-center shadow-blue-200 w-full ">
      <Title variant="flashcard">Crée ta flashcard</Title>
      <div className="flex flex-col items-center gap-6 w-full ">
        <LanguageInputWithFlag
          languageCode={learningLanguageCode}
          languageName={learningLanguage}
          value={translatedWord}
          onChange={setTranslatedWord}
        />
        <LanguageInputWithFlag
          languageCode={user?.nativeLanguage || ""}
          languageName={nativeLanguageName}
          value={nativeWord}
          onChange={setNativeWord}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button variant="option" onClick={() => setShowSelect((prev) => !prev)}>
          {showSelect ? "Masquer les options" : "Ajouter des options"}
          {showSelect ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
        {showSelect && (
          <Dropdown
            options={CATEGORIES}
            value={category}
            onChange={(selectedCategory) =>
              setCategory(selectedCategory as TWordCategory)
            }
          />
        )}
      </div>
      <Button variant="submit" onClick={handleCreate}>
        Valider
      </Button>
    </div>
  );
}
