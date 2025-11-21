import { Button, Input } from "@/ui";
import { useFlashcardSession } from "@/hooks/useFlashcardSession";
import { TFlashcard } from "@/types/flashcard";
import { ButtonProps } from "../ui/Button";
import { FeedbackMessage } from "./FlashcardMessage";
import Image from "next/image";

type FlashcardProps = {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  flashcards: TFlashcard[];
  language: string;
  id: string;
};

type ButtonConfig = {
  states: string[];
  label: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
};

export default function Flashcard({
  currentIndex,
  setCurrentIndex,
  flashcards,
  language,
  id,
}: FlashcardProps) {
  const {
    currentCard,
    answer,
    state,
    handleAnswer,
    handleCheckAnswer,
    handleHelp,
    handleNext,
    handleReloadInput,
    handleFinish,
  } = useFlashcardSession(flashcards, currentIndex, setCurrentIndex, id);

  const buttonsConfig: ButtonConfig[] = [
    {
      states: ["answering"],
      label: "Vérifier la réponse",
      variant: "submit",
      onClick: handleCheckAnswer,
    },
    {
      states: ["answering"],
      label: "Voir la réponse",
      variant: "flashcardSeeAnswer",
      onClick: handleHelp,
    },
    {
      states: ["incorrect"],
      label: "Je retente ma chance",
      variant: "flashcardRetryAnwser",
      onClick: handleReloadInput,
    },
    {
      states: ["correct", "help-shown"],
      label:
        currentIndex === flashcards.length - 1
          ? "Terminer la session"
          : "Passer à la flashcard suivante",
      variant: "submit",
      onClick:
        currentIndex === flashcards.length - 1 ? handleFinish : handleNext,
    },
  ];

  const renderedButtons = buttonsConfig
    .filter((b) => b.states.includes(state))
    .map((b) => {
      const isDisabled = b.label === "Vérifier la réponse" && !answer.trim();

      return (
        <Button
          key={b.label}
          onClick={b.onClick}
          disabled={isDisabled}
          variant={b.variant}
        >
          {b.label}
        </Button>
      );
    });

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col justify-between text-center w-full max-w-md h-[300px]">
      <p className="text-xl font-semibold">
        Mot à traduire : <strong>{currentCard.nativeWord}</strong>
      </p>
      <div className="flex items-center justify-center gap-4">
        {state === "answering" && (
          <Image
            src={`/assets/flags/${id}.png`}
            alt={`Drapeau de ${language}`}
            width={30}
            height={30}
          />
        )}
        {state === "answering" && (
          <Input
            placeholder="Écris la traduction ici"
            value={answer}
            onChange={handleAnswer}
          />
        )}
        <FeedbackMessage
          state={state}
          translatedWord={currentCard.translatedWord}
        />
      </div>
      <div className="flex gap-4 justify-center w-full">{renderedButtons}</div>
    </div>
  );
}
