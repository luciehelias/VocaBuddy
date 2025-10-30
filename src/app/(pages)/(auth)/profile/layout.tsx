import { Title, Button } from "@/ui";

import Link from "next/link";

export default function ClerkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-screen gap-4">
      <Title>Bienvenue sur votre Profil</Title>
      <p className="text-lg">Gérez vos informations et paramètres ici.</p>
      <Link href="/flashcards" className="mb-8">
        <Button variant="primary">Voir vos Flash Cards</Button>
      </Link>
      {children}
    </div>
  );
}
