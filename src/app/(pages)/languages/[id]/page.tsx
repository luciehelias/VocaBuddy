import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default async function LanguageMenu({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log(id);
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Title>Menu for Language {id.toUpperCase()}</Title>
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
