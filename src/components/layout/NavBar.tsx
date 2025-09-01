import Button from "@/components/ui/Button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@/services/clerk/components/SignInStatus";

const NavBar = () => {
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
      <SignedIn>
        <SignOutButton>
          <Button variant="auth">Se déconnecter</Button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default NavBar;
