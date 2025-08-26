import FlashcardForm from "@/components/pages/flashcard/FlashcardForm";

export default function FlashcardPage({ params }: { params: { id: string } }) {

  if (!params.id) return <div>No language found</div>;

  return (
    <div>
      <FlashcardForm />
    </div>
  );
}
