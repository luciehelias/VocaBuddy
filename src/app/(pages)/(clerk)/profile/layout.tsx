import Button from "@/app/components/ui/Button";
import Link from "next/link";

export default function ClerkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <h1 className="text-3xl font-bold">Bienvenue sur votre Profil</h1>
      <p className="mt-4 text-lg">Gérez vos informations et paramètres ici.</p>
      <Link href="/flashcards" className="mt-4 mb-8">
        <Button className="border-2 uppercase text-sm">
          Voir vos Flash Cards
        </Button>
      </Link>
      {children}
    </div>
  );
}
