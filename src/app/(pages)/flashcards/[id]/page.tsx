import { Title, Button } from "@/ui";
import Link from "next/link";

export default async function ManageFlashcards({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  if (!id) return <div>No language found</div>;

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Title>Gérer les flashcards</Title>
      <Link href={`/flashcards/${id}/create`}>
        <Button className="create-button">Créer une flashcard</Button>
      </Link>
    </div>
  );
}
