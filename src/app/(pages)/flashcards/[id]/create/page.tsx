import Image from "next/image";
import { getLanguageName } from "@/utils/language";
import FlashcardForm from "@/components/form/FlashcardForm";
import Title from "@/ui/Title";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

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
      <Link href={`/language/${id}`} className="hover:font-bold flex gap-4">
        <ArrowBigRight />
        <p>Je suis prêt à travailler mon {language} !</p>
      </Link>
    </div>
  );
}
