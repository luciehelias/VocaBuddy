"use client";

import { useState } from "react";
import { useFlashcards } from "@/hooks/useFlashcard";
import { ChevronUp, ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Dropdown from "@/ui/Dropdown";

const categories = [
  "Verbes",
  "Noms",
  "Expression",
  "Adjectifs",
  "Adverbes",
  "Autres",
];

const FlashcardForm = () => {
  const { createFlashcard } = useFlashcards();

  const [nativeWord, setNativeWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");

  const [category, setCategory] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  const handleCreate = () => {
    createFlashcard({
      userId: "6432f4abc1234567890def12", // Replace with actual user ID
      nativeWord,
      translatedWord,
      targetLanguage: "en",
      category,
    });
    setNativeWord("");
    setTranslatedWord("");
    setCategory("");
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-6 items-center shadow-blue-200 w-3/12">
      <h1>Créer votre flashcard</h1>
      <div className="flex flex-col items-center gap-6 w-full">
        {/* // TODO : add the natif language of the user and the language that the
        user wants to learn */}
        <Input
          placeholder="Mot dans votre langue"
          value={nativeWord}
          onChange={setNativeWord}
        />
        <Input
          placeholder="Mot traduit"
          value={translatedWord}
          onChange={setTranslatedWord}
        />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button
          className="flex justify-center gap-2"
          onClick={() => setShowSelect((prev) => !prev)}
        >
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
      <Button className="border-1 bg-emerald-200" onClick={handleCreate}>
        Valider
      </Button>
    </div>
  );
};

export default FlashcardForm;
