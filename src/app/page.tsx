import Footer from "./components/layout/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`flex flex-col min-h-screen bg-orange-50 ${poppins.className}`}
    >
      <main className="flex-grow flex items-center justify-center">
        <h1>VocaBuddy</h1>
      </main>
      <footer className="flex justify-center">
        <Footer />
      </footer>
    </div>
  );
}
