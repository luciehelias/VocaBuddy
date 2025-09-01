import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { getLanguageName } from "@/utils/getLanguage";
import { ArrowBigRight, BicepsFlexed, Dumbbell, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LanguageMenu({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const language = getLanguageName(id);

  if (!id || !language) return <div>No language found</div>;

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      <div className="flex justify-center gap-6 w-full">
        <Image
          src={`/assets/flags/${id}.png`}
          alt={`Drapeau de ${language}`}
          width={40}
          height={40}
        />
        <Title>Hey! Prêt à travailler ton {language} ?</Title>
      </div>
      <ul className="flex gap-8">
        <li>
          <Link href={`/flashcards/${id}/create`}>
            <Button variant="icon" className="create-color">
              <Lightbulb size={64} color={"#FFD5A6"} />
              <span className="font-bold">Mode Création</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={`/language/${id}/train/`}>
            <Button variant="icon" className="train-color">
              <Dumbbell size={64} color={"#BFDBFF"} />
              <span className="font-bold">Mode Entraînement</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={`/language/${id}/test`}>
            <Button variant="icon" className="test-color">
              <BicepsFlexed size={64} color={"#FFCCD3"} />
              <span className="font-bold">Mode Révision</span>
            </Button>
          </Link>
        </li>
      </ul>
      <Link href={`/flashcards/${id}`}>
        <Button className="flex items-center gap-2">
          <ArrowBigRight />
          <p>Gérer les flashcards</p>
        </Button>
      </Link>
    </div>
  );
}
