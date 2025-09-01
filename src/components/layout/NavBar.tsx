"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@/services/clerk/components/SignInStatus";
import { useAvatar } from "@/hooks/useAvatar";
import { useUserData } from "@/contexts/userContext";
import Button from "@/components/ui/Button";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const user = useUserData();
  const { avatarUrl } = useAvatar(user?.avatarUrl);
  return (
    <div className="flex flex-col items-center gap-4">
      <SignedOut>
        <Link href="/sign-in">
          <Button variant="auth">Se Connecter</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="auth">S'inscrire</Button>
        </Link>
      </SignedOut>
      <div className="relative flex items-center gap-8">
        <div className="relative">
          <Settings
            className="cursor-pointer w-10 h-10 text-shadow-gray-800"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-44 border rounded-lg shadow-lg z-20 p-4 flex flex-col gap-2">
                <Link href="/profile" className="hover:font-bold">
                  Mon profil
                </Link>
                <SignedIn>
                  <SignOutButton>
                    <span className="cursor-pointer hover:font-bold">
                      Se déconnecter
                    </span>
                  </SignOutButton>
                </SignedIn>
              </div>
            </>
          )}
        </div>
        <Link href="/profile">
          <img
            src={avatarUrl || user?.avatarUrl}
            alt="Avatar"
            className="rounded-full w-14 h-14"
          />
        </Link>
      </div>
    </div>
  );
}
