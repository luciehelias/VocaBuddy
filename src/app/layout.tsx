import type { Metadata } from "next";

import "./globals.css";

import { poppins } from "@/fonts/poppins";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "VocaBuddy",
  description: "Buddy up your vocabulary with VocaBuddy!",
  icons: {
    icon: "/favicon.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col justify-between min-h-screen bg-orange-50 ${poppins.className}`}
      >
        <header className="p-4">
          <Header />
        </header>
        {children}
        <footer className="flex justify-center">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
