"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { delius } from "@/fonts/delius";
import Link from "next/link";
import {
  SignOutButton,
} from "@clerk/nextjs";
import {
  SignedIn,
  SignedOut,
} from "@/app/services/clerk/components/SignInStatus";

const Header = () => {
  return (
    <div className="flex items-center justify-between pr-2">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/logo.png"
          alt="logo vocabuddy"
          width={100}
          height={100}
          priority
        />
      </Link>
      <Link href="/" className="flex items-center gap-2">
        <h1 className={`text-5xl font-bold p-4 ${delius.className}`}>
          VocaBuddy
        </h1>
      </Link>
      <div className="flex flex-col items-center gap-4">
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="auth">Se Connecter</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="auth">S'inscrire</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <Button variant="auth">
              Se déconnecter
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
