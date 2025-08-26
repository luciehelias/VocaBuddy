import Link from "next/link";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <Title variant="lg">Bienvenue sur VocaBuddy</Title>
      <p className="my-4 text-lg">
        Ton assistant personnel de vocabulaire pour t'aider à apprendre et à
        progresser !
      </p>
      <Link href="/flashcards" className="mt-4">
        <Button>Crée une Flash Card</Button>
      </Link>
    </div>
  );
}
