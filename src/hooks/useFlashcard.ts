"use client";

import { useState, useEffect } from "react";
import { IFlashcard } from "@/types/flashcard";

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [selectedId, setSelectedId] = useState("");

  // fetch all the flashcards
  const loadFlashcards = async () => {
    const res = await fetch("/api/flashcards");
    const data = await res.json();
    setFlashcards(data);
  };

  // create a new flashcard
  const createFlashcard = async (flashcard: Partial<IFlashcard>) => {
    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flashcard),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to create flashcard");
      return;
    }
    loadFlashcards();
  };

  // delete a flashcard
  const deleteFlashcard = async (id: string) => {
    const res = await fetch("/api/flashcards", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to delete flashcard");
      return;
    }
    loadFlashcards();
  };

  // Handle flashcard selection
  const updateFlashcard = async (
    id: string,
    updatedData: Partial<IFlashcard>
  ) => {
    const res = await fetch("/api/flashcards", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedData }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to update flashcard");
      return;
    }
    setSelectedId("");
    loadFlashcards();
  };

  useEffect(() => {
    loadFlashcards();
  }, []);

  return {
    flashcards,
    selectedId,
    loadFlashcards,
    createFlashcard,
    deleteFlashcard,
    updateFlashcard,
  };
};
