import Link from "next/link";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

type SettingsNavProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsNav({ setOpen }: SettingsNavProps) {
  return (
    <nav className="nav">
      <Link href="/profile" className="hover:font-bold" onClick={() => setOpen((p) => !p)}>
        Mon profil
      </Link>
      <SignedIn>
        <SignOutButton>
          <span className="cursor-pointer hover:font-bold">Se déconnecter</span>
        </SignOutButton>
      </SignedIn>
    </nav>
  );
}
