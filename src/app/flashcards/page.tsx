"use client";

import { useState } from "react";

import { IFlashcard } from "../types/flashcard";

export default function HomePage() {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [nativeWord, setNativeWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");

  // fetch all the flashcards
  const loadFlashcards = async () => {
    const res = await fetch("/api/flashcards");
    const data = await res.json();
    setFlashcards(data);
  };

  // create a new flashcard
  const createFlashcard = async () => {
    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "6432f4abc1234567890def12",
        nativeWord,
        translatedWord,
        targetLanguage: "en",
        category: "general",
      }),
    });
    const data = await res.json();
    setNativeWord("");
    setTranslatedWord("");
    loadFlashcards();
  };

  const deleteFlashcard = async (id: string) => {
    const res = await fetch("/api/flashcards", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }
    alert(data.message);
    loadFlashcards();
  };

  return (
    <main>
      <h2>Create Flashcard</h2>
      <input
        placeholder="Native Word"
        value={nativeWord}
        onChange={(e) => setNativeWord(e.target.value)}
      />
      <input
        placeholder="Translated Word"
        value={translatedWord}
        onChange={(e) => setTranslatedWord(e.target.value)}
      />
      <button onClick={createFlashcard}>Create</button>
      <hr />
      <h2>Flashcards</h2>
      <button onClick={loadFlashcards}>Load Flashcards</button>
      <ul>
        {flashcards.map((card) => (
          <li key={card._id}>
            {card.nativeWord} → {card.translatedWord} ({card.targetLanguage})
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {flashcards.map((card) => (
          <li key={card._id}>
            {card.nativeWord} → {card.translatedWord}
            <br />
            <button onClick={() => deleteFlashcard(card._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
