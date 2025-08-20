import Link from "next/link";
import Button from "./components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-5xl font-bold">Bienvenue sur VocaBuddy</h1>
      <p className="my-4 text-lg">
        Ton assistant personnel de vocabulaire pour t'aider à apprendre et à
        progresser !
      </p>
      <Link href="/flashcards" className="mt-4">
        <Button className="border-2 uppercase text-sm">Crée une Flash Card</Button>
      </Link>
    </div>
  );
}
