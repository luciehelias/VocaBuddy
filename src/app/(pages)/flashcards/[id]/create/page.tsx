import FlashcardForm from "@/components/pages/flashcard/FlashcardForm";
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
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="flex gap-6 w-full">
        <Image
          src={`/assets/flags/${id}.png`}
          alt={`Drapeau de ${language}`}
          width={40}
          height={40}
        />
        <Title>Yeah un nouveau mot !</Title>
      </div>
      <div className="w-full flex justify-center">
        <FlashcardForm languageCode={id} />
      </div>
    </div>
  );
}
