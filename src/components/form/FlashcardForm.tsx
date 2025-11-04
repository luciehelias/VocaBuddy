"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useFlashcards } from "@/hooks/useFlashcard";
import { useUserData } from "@/contexts/userContext";
import { CATEGORIES } from "@/const/flashcards";
import { TWordCategory } from "@/types/category";
import { Dropdown, Title, Input, Button } from "@/ui";
import LanguageInputWithFlag from "@/components/form/LanguageInputWithFlag";

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
  const [exampleSentence, setExampleSentence] = useState("");
  const [category, setCategory] = useState<TWordCategory>("Autre");
  const [showSelect, setShowSelect] = useState(false);

  const handleCreate = () => {
    createFlashcard({
      nativeWord,
      translatedWord,
      targetLanguages: languageCode,
      category,
      exampleSentence,
    });
    setNativeWord("");
    setTranslatedWord("");
    setExampleSentence("");
    setCategory("Autre");
  };

  if (!user || !user.nativeLanguage) return null;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-8 items-center shadow-blue-200 w-full ">
      <Title variant="flashcard">Crée ta flashcard</Title>
      <div className="flex flex-col items-center gap-6 w-full ">
        <LanguageInputWithFlag
          languageCode={languageCode}
          languageName={learningLanguage}
          value={translatedWord}
          onChange={setTranslatedWord}
        />
        <LanguageInputWithFlag
          languageCode={user.nativeLanguage.code}
          languageName={user.nativeLanguage.name}
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
          <>
            <p className="underline underline-offset-4">
              Choisis une catégorie :
            </p>
            <Dropdown
              options={CATEGORIES}
              value={category}
              onChange={(selectedCategory) =>
                setCategory(selectedCategory as TWordCategory)
              }
            />
            <p className="underline underline-offset-4">
              Ecris une phrase en {learningLanguage.toLowerCase()} pour
              illustrer ton mot :
            </p>
            <Input
              placeholder="Phrase exemple"
              value={exampleSentence}
              onChange={setExampleSentence}
            />
          </>
        )}
      </div>
      <Button variant="submit" onClick={handleCreate}>
        Valider
      </Button>
    </div>
  );
}
