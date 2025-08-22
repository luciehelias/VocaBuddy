import Title from "@/ui/Title";
import Link from "next/link";

export default function ClerkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <Title variant="sm">Connecte toi à ton compte VocaBuddy !</Title>
      <p className="mt-2 text-sm text-gray-500 mb-8">
        Une fois connecté, tu pourras accéder à toutes les fonctionnalités de
        VocaBuddy.
      </p>
      <div>{children}</div>
      <div>
        <p className="mt-4 text-md">
          Si tu n'as pas encore de compte, tu peux en créer un facilement{" "}
          <Link href="/sign-up">
            <span className="text-blue-700 font-bold">ici</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
