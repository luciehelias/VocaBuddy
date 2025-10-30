import Image from "next/image";
import { delius } from "@/fonts/delius";
import Link from "next/link";
import ProfileMenu from "@/layout/ProfileMenu";

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex items-center justify-between pr-2">
        <Link href="/languages" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="logo vocabuddy"
            width={100}
            height={100}
            priority
          />
        </Link>
        <Link href="/languages" className="flex items-center gap-2">
          <p className={`text-5xl font-bold p-4 ${delius.className}`}>
            VocaBuddy
          </p>
        </Link>
        <ProfileMenu />
      </div>
    </header>
  );
}
