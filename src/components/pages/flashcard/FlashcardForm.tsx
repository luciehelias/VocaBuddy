"use client";

import { useState } from "react";
import { useFlashcards } from "@/hooks/useFlashcard";
import { ChevronUp, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import Title from "@/components/ui/Title";
import { categories } from "@/data/languages";

const FlashcardForm = ({ languageCode }: { languageCode: string }) => {
  const { createFlashcard } = useFlashcards();

  const [nativeWord, setNativeWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [category, setCategory] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  const handleCreate = () => {
    createFlashcard({
      nativeWord,
      translatedWord,
      targetLanguage: languageCode,
      category,
    });
    setNativeWord("");
    setTranslatedWord("");
    setCategory("");
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-6 items-center shadow-blue-200 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <Title variant="flashcard">Crée ta flashcard</Title>
      <div className="flex flex-col items-center gap-6 w-full">
        {/* // TODO : add the natif language of the user and the language that the
        user wants to learn */}
        <Input
          placeholder="Mot dans ta langue"
          value={nativeWord}
          onChange={setNativeWord}
        />
        <Input
          placeholder="Mot traduit dans la langue cible"
          value={translatedWord}
          onChange={setTranslatedWord}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button variant="option" onClick={() => setShowSelect((prev) => !prev)}>
          {showSelect ? "Masquer les options" : "Ajouter des options"}
          {showSelect ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
        {showSelect && (
          <Dropdown
            options={categories}
            value={category}
            onChange={setCategory}
          />
        )}
      </div>
      <Button variant="submit" onClick={handleCreate}>
        Valider
      </Button>
    </div>
  );
};

export default FlashcardForm;
