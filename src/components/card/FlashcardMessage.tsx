import { FlashcardState } from "@/types/flashcard";

type FeedbackProps = {
  state: FlashcardState;
  translatedWord: string;
};

export function FeedbackMessage({ state, translatedWord }: FeedbackProps) {
  switch (state) {
    case "correct":
      return (
        <p className="text-green-600">
          🎉 Bravo ! La bonne réponse était : <strong>{translatedWord}</strong>
        </p>
      );

    case "help-shown":
      return (
        <p className="text-green-600">
          La réponse est : <strong>{translatedWord}</strong>
        </p>
      );

    case "incorrect":
      return (
        <p className="text-red-500">
          ❌ Ce n'est pas la bonne réponse, réessaie !
        </p>
      );

    default:
      return null;
  }
}
