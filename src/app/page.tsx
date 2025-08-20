import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { poppins } from "@/fonts/poppins";

export default function Home() {
  return (
    <div
      className={`flex flex-col min-h-screen bg-orange-50 ${poppins.className}`}
    >
      <header className="flex-grow p-4">
        <Header />
      </header>
      <main className="flex-grow flex items-center justify-center"></main>
      <footer className="flex justify-center">
        <Footer />
      </footer>
    </div>
  );
}
