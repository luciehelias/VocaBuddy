"use client";

import { useState } from "react";
import Button from "./Button";

type ManageFlashcardRowProps = {
  id: string;
  nativeWord: string;
  translatedWord: string;
  onDelete?: () => void;
};

export default function ManageFlashcardRow({
  id,
  nativeWord: initialNativeWord,
  translatedWord: initialTranslatedWord,
  onDelete,
}: ManageFlashcardRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nativeWord, setNativeWord] = useState(initialNativeWord);
  const [translatedWord, setTranslatedWord] = useState(initialTranslatedWord);

  const [editedNativeWord, setEditedNativeWord] = useState(initialNativeWord);
  const [editedTranslatedWord, setEditedTranslatedWord] = useState(
    initialTranslatedWord
  );

  const handleDelete = async () => {
    if (!confirm("Voulez-vous vraiment supprimer cette flashcard ?")) return;

    try {
      const res = await fetch("/api/flashcards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erreur lors de la suppression");
        return;
      }

      alert("Flashcard supprimée !");
      if (onDelete) onDelete();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };
  const handleEdit = async () => {
    try {
      const res = await fetch("/api/flashcards", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          nativeWord: editedNativeWord,
          translatedWord: editedTranslatedWord,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erreur lors de la modification");
        return;
      }
      setNativeWord(editedNativeWord);
      setTranslatedWord(editedTranslatedWord);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification");
    }
  };
  const handleCancel = () => {
    setNativeWord(nativeWord);
    setTranslatedWord(translatedWord);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full p-4 border-b-2 rounded  border-gray-500">
      <div className="flex gap-8 w-full">
        {isEditing ? (
          <>
            <input
              type="text"
              className="w-full md:w-1/2 border rounded p-1"
              placeholder={nativeWord}
              onChange={(e) => setEditedNativeWord(e.target.value)}
            />
            <input
              type="text"
              className="w-full md:w-1/2 border rounded p-1"
              placeholder={translatedWord}
              onChange={(e) => setEditedTranslatedWord(e.target.value)}
            />
          </>
        ) : (
          <div className="flex gap-8 w-full p-2">
            <p className="w-1/2 break-words">{nativeWord}</p>
            <p className="w-1/2 break-words border-l border-gray-300 pl-4">
              {translatedWord}
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-center items-center md:justify-end w-full">
        {isEditing ? (
          <>
            <Button variant="save" onClick={handleEdit}>
              Enregistrer
            </Button>
            <Button variant="cancel" onClick={handleCancel}>
              Annuler
            </Button>
          </>
        ) : (
          <>
            <Button variant="edit" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
            <Button variant="delete" onClick={handleDelete}>
              Supprimer
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
