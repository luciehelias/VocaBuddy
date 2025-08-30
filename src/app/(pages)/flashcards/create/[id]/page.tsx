import FlashcardForm from "@/components/pages/flashcard/FlashcardForm";
import Title from "@/components/ui/Title";
import { getLanguageName } from "@/utils/getLanguage";
import Image from "next/image";

export default function FlashcardPage({ params }: { params: { id: string } }) {
  if (!params.id) return <div>No language found</div>;
  const language = getLanguageName(params.id);

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Title>Créer une flashcard en {language}</Title>
      <Image
        src={`/assets/flags/${params.id}.png`}
        alt={`Drapeau de ${language}`}
        width={100}
        height={100}
      />
      <div className="w-full flex justify-center">
        <FlashcardForm languageCode={params.id} />
      </div>
    </div>
  );
}
