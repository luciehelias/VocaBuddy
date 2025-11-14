"use client";
import React, { useEffect, useState } from "react";
import { getLanguageName } from "@/utils/language";
import { Title } from "@/ui";
import { TFlashcard } from "@/types/flashcard";
import Flashcard from "@/components/card/Flashcard";

export default function TrainPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const language = getLanguageName(id);

  const [flashcards, setFlashcards] = useState<TFlashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserFlashcards() {
      try {
        const res = await fetch("/api/flashcards");
        if (!res.ok)
          throw new Error("Erreur lors du chargement des flashcards");
        const data = await res.json();

        const filtered = data.flashcards.filter(
          (fc: TFlashcard) => fc.targetLanguages === id
        );

        setFlashcards(filtered);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUserFlashcards();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (flashcards.length === 0)
    return <p>Aucune flashcard trouvée pour la langue {language}.</p>;

  return (
    <div className="flex flex-col items-center gap-6">
      <Title variant="sm">
        Entraînement en {language.toLowerCase()} — carte {currentIndex + 1} /{" "}
        {flashcards.length}
      </Title>

      <Flashcard
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        flashcards={flashcards}
      />
    </div>
  );
}
