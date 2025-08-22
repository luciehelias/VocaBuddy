import Title from "@/ui/Title";

export default function ClerkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-screen gap-6">
      <Title variant="sm">Crée ton compte VocaBuddy maintenant !</Title>
      <div>{children}</div>
    </div>
  );
}
