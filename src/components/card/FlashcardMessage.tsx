import { FlashcardState } from "@/types/flashcard";

type FeedbackProps = {
  state: FlashcardState;
  translatedWord: string;
  exampleSentence?: string;
};

function ExampleSentence({ sentence }: { sentence?: string }) {
  if (!sentence) return null;
  return <p className="text-gray-600 italic">Exemple : {sentence}</p>;
}

export function FeedbackMessage({
  state,
  translatedWord,
  exampleSentence,
}: FeedbackProps) {
  switch (state) {
    case "correct":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-green-600">
            🎉 Bravo ! La bonne réponse était :{" "}
            <strong>{translatedWord}</strong>
          </p>
          <ExampleSentence sentence={exampleSentence} />
        </div>
      );

    case "answer-revealed":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-green-600">
            La réponse est : <strong>{translatedWord}</strong>
          </p>
          <ExampleSentence sentence={exampleSentence} />
        </div>
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
