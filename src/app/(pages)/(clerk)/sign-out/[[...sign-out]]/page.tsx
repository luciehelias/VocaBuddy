import Button from "@/ui/Button";
import Title from "@/ui/Title";
import Link from "next/link";

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen gap-4">
      <Title variant="sm">You have been signed out</Title>
      <p className="text-lg">Thank you for using VocaBuddy!</p>
      <p className="m-4 text-sm">
        You can now close this page or return to the home page.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
