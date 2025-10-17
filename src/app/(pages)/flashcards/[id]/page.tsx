"use client";

import { Title, Button, ManageFlashcardRow } from "@/ui";
import { LANGUAGES } from "@/const/languages";
import { useUserData } from "@/contexts/userContext";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

import React, { useEffect, useState } from "react";

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
    async function loadFlashcards() {
      try {
        const res = await fetch("/api/flashcards");
        if (!res.ok) {
          throw new Error("Erreur lors du chargement");
        }
        const data = await res.json();
        setFlashcards(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFlashcards();
  }, []);

  if (!id) return <div>No language found</div>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="flex flex-col h-screen gap-8 w-full max-w-[1000px] m-auto">
      <Title>Gérer votre vocabulaire</Title>
      <div className="flex flex-col gap-2 w-full mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full p-4 rounded  sticky top-0 z-10">
          <div className="flex gap-8 w-full">
            <p className="flex gap-2 items-center w-1/2">
              <img
                src={nativeLanguageFlagUrl}
                className="w-6 h-6 object-contain flag"
              />
              <strong>Mot natif</strong>
            </p>
            <p className="flex gap-2 items-center w-1/2">
              <img
                src={targetLanguageFlagUrl}
                className="w-6 h-6 object-contain flag"
              />
              <strong>Mot traduit</strong>
            </p>
          </div>
          <div className="flex gap-4 justify-center items-center md:justify-end w-full">
            <span className="w-38" />
            <span className="w-38" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-[1000px] w-full overflow-y-auto">
        {flashcards
          .filter((fc) => fc.targetLanguages === id)
          .map((fc) => (
            <ManageFlashcardRow
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
        <Link href={`/language/${id}`}>
          <Button className="flex items-center gap-2 creation-color--reverse">
            <ArrowBigRight />
            <p>Retour page principale</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
