"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings } from "lucide-react";
import { SignedOut } from "@/services/clerk/components/SignInStatus";
import { useAvatar } from "@/hooks/useAvatar";
import { useUserData } from "@/contexts/userContext";
import Button from "@/components/ui/Button";
import SettingsNav from "@/layout/SettingsNav";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const user = useUserData();
  const { avatarUrl } = useAvatar(user?.avatarUrl);

  return (
    <div className="flex flex-col items-center gap-4">
      {!user ? (
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="auth">Se Connecter</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="auth">S'inscrire</Button>
          </Link>
        </SignedOut>
      ) : (
        <div
          className="relative flex items-center gap-8"
          onMouseLeave={() => setOpen(false)}
        >
          <div
            className="relative flex gap-8"
            onMouseEnter={() => setOpen(true)}
          >
            <Settings
              className="cursor-pointer w-10 h-10 text-gray-700"
              onClick={() => setOpen((p) => !p)}
            />
            {open && <SettingsNav setOpen={setOpen} />}
          </div>
          <Link
            href="/user/dashboard"
            onMouseEnter={() => setOpen(false)}
            className="flex flex-col gap-2 mt-8 pl-1"
          >
            <img
              src={avatarUrl || user?.avatarUrl}
              alt="Avatar"
              className="avatar rounded-full w-12 h-12"
            />
            <span>{user?.username}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
