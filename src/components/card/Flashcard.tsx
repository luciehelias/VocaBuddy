import { Button, Input } from "@/ui";
import { useFlashcardSession } from "@/hooks/useFlashcardSession";
import { TFlashcard } from "@/types/flashcard";
import { ButtonProps } from "../ui/Button";

type FlashcardProps = {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  flashcards: TFlashcard[];
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
  } = useFlashcardSession(flashcards, currentIndex, setCurrentIndex);

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
      label: "Passer à la flashcard suivante",
      variant: "submit",
      onClick: handleNext,
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
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-6 justify-between text-center w-full max-w-md h-[300px]">
      <p className="text-xl font-semibold">
        Mot à traduire : <strong>{currentCard.nativeWord}</strong>
      </p>

      {state === "correct" && (
        <p className="text-green-600">
          🎉 Bravo ! La bonne réponse était :{" "}
          <strong>{currentCard.translatedWord}</strong>
        </p>
      )}

      {state === "help-shown" && (
        <p className="text-green-600">
          La réponse est : <strong>{currentCard.translatedWord}</strong>
        </p>
      )}

      <>
        {state === "answering" && (
          <Input
            placeholder="Écris la traduction ici"
            value={answer}
            onChange={handleAnswer}
          />
        )}

        {state === "incorrect" && (
          <p className="text-red-500">
            ❌ Ce n'est pas la bonne réponse, réessaie !
          </p>
        )}
      </>
      <div className="flex gap-4 justify-center w-full">{renderedButtons}</div>
    </div>
  );
}
