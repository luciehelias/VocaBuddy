import FlashcardForm from "@/components/form/FlashcardForm";
import Title from "@/components/ui/Title";
import { getLanguageName } from "@/utils/getLanguage";
import Image from "next/image";

export default async function FlashcardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const language = getLanguageName(id);

  if (!id || !language) return <div>No language found</div>;

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Title>Créer une flashcard en {language}</Title>
      <Image
        src={`/assets/flags/${id}.png`}
        alt={`Drapeau de ${language}`}
        width={100}
        height={100}
      />
      <div className="w-full flex justify-center">
        <FlashcardForm languageCode={id} />
      </div>
    </div>
  );
}
