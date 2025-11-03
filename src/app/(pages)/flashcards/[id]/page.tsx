"use client";

import React, { useEffect, useState } from "react";

import { Title, LinkButton } from "@/ui";
import { HeaderFlashcardManageRow, FlashcardManageRow } from "@/table";
import { LANGUAGES } from "@/const/languages";
import { useUserData } from "@/contexts/userContext";
import { TFlashcard } from "@/types/flashcard";

export default function ManageFlashcards({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const language = LANGUAGES.find((lang) => lang.code === id);
  const targetLanguageFlagUrl = language?.flagUrl;
  const user = useUserData();
  const nativeLanguageFlagUrl = user?.nativeLanguage?.flagUrl;

  if (!id) return <div>No language found</div>;

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserFlashcards() {
      try {
        const res = await fetch("/api/flashcards");
        if (!res.ok)
          throw new Error("Erreur lors du chargement de l'utilisateur");

        const data = await res.json();

        const userFlashcards = data.flashcards.filter(
          (flashcards: TFlashcard) => flashcards.targetLanguages === id
        );

        setFlashcards(userFlashcards);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUserFlashcards();
  }, [id]);

  if (!id) return <div>No language found</div>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="flex flex-col h-screen gap-8 w-full max-w-[1000px] m-auto">
      <Title>Gérer votre vocabulaire</Title>
      <div className="flex flex-col gap-2 w-full mt-8">
        <HeaderFlashcardManageRow
          nativeLanguageFlagUrl={nativeLanguageFlagUrl}
          targetLanguageFlagUrl={targetLanguageFlagUrl}
        />
      </div>
      <div className="flex flex-col gap-2 max-w-[1000px] w-full overflow-y-auto">
        {flashcards
          .filter((fc) => fc.targetLanguages === id)
          .map((fc) => (
            <FlashcardManageRow
              key={fc._id}
              id={fc._id}
              nativeWord={fc.nativeWord}
              translatedWord={fc.translatedWord}
              onDelete={() =>
                setFlashcards((prev) => prev.filter((f) => f._id !== fc._id))
              }
            />
          ))}
      </div>
      <div className="flex justify-center">
        <LinkButton
          href={`/language/${id}`}
          text="Retour vers la page principale"
        />
      </div>
    </div>
  );
}
