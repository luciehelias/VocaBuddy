import { TFlashcard, FlashcardState } from "@/types/flashcard";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";

export function useFlashcardSession(
  flashcards: TFlashcard[],
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  id: string
) {
  const router = useRouter();

  const currentCard = useMemo(
    () => flashcards[currentIndex],
    [flashcards, currentIndex]
  );

  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<FlashcardState>("answering");

  const handleAnswer = (value: string) => {
    setAnswer(value);
    if (state !== "answering") {
      setState("answering");
    }
  };

  const handleReloadInput = () => {
    setAnswer("");
    setState("answering");
  };

  const handleCheckAnswer = () => {
    if (!answer || !answer.trim()) {
      return;
    }
    const correct =
      answer.trim().toLowerCase() ===
      currentCard.translatedWord.trim().toLowerCase();

    if (correct) {
      setState("correct");
    } else {
      setState("incorrect");
    }
  };

  const handleRevealAnswer = () => {
    setState("answer-revealed");
  };

  const handleNext = useCallback(() => {
    setAnswer("");
    setState("answering");
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  }, [flashcards.length, setCurrentIndex]);

  const handleFinish = () => {
    router.push(`/language/${id}`);
  };

  return {
    currentCard,
    answer,
    state,
    handleAnswer,
    handleCheckAnswer,
    handleRevealAnswer,
    handleNext,
    handleReloadInput,
    handleFinish,
  };
}
