export default function ClerkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold mt-4 mb-8">Crée ton compte VocaBuddy maintenant !</h1>
      <div>{children}</div>
    </div>
  );
}
