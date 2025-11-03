import Image from "next/image";
import { getLanguageName } from "@/utils/language";
import FlashcardForm from "@/components/form/FlashcardForm";
import { Title, LinkButton } from "@/ui";

export default async function FlashcardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const language = getLanguageName(id);

  if (!id || !language) return <div>No language found</div>;

  return (
    <div className="flex flex-col gap-12 items-center justify-center w-full max-w-xl mx-auto">
      <div className="flex gap-6 justify-center">
        <Image
          src={`/assets/flags/${id}.png`}
          alt={`Drapeau de ${language}`}
          width={40}
          height={40}
        />
        <Title>Yeah un nouveau mot !</Title>
      </div>
      <div className="w-full flex justify-center">
        <FlashcardForm languageCode={id} learningLanguage={language} />
      </div>
      <LinkButton
        href={`/language/${id}`}
        text="Retour vers la page principale"
      />
    </div>
  );
}
