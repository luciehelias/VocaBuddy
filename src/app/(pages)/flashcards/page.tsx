"use client";

import { useState } from "react";

import { IFlashcard } from "../../types/flashcard";

export default function HomePage() {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [selectedId, setSelectedId] = useState("");
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
    if (!res.ok) {
      alert(data.error || "Failed to create flashcard");
      return;
    }
    setNativeWord("");
    setTranslatedWord("");
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
  const selectFlashcard = (card: IFlashcard) => {
    setSelectedId(card._id);
    setNativeWord(card.nativeWord);
    setTranslatedWord(card.translatedWord);
  };

  // Update a flashcard
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
    setNativeWord("");
    setTranslatedWord("");
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
            <button onClick={() => selectFlashcard(card)}>Edit</button>
            <br />
            {selectedId && (
              <div style={{ marginTop: "20px" }}>
                <h2>Edit Flashcard</h2>
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
                <button
                  onClick={() =>
                    updateFlashcard(selectedId, { nativeWord, translatedWord })
                  }
                >
                  Save Changes
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
