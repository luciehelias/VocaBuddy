import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { getLanguageName } from "@/utils/getLanguage";
import Image from "next/image";
import Link from "next/link";

export default async function LanguageMenu({ params }: { params: { id: string } }) {
  const { id } = await params;
  const language = getLanguageName(id);
  
  if (!id || !language) return <div>No language found</div>;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Title>Liste des actions pour la langue : {language}</Title>
      <Image
        src={`/assets/flags/${id}.png`}
        alt={`Drapeau de ${language}`}
        width={100}
        height={100}
      />
      <ul className="flex gap-4">
        <li>
          <Link href={`/flashcards/create/${id}`}>
            <Button>Create Flashcards</Button>
          </Link>
        </li>
        <li>
          <Link href={`/flashcards/${id}`}>
            <Button>All Flashcards</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
