import Button from "@/app/components/ui/Button";
import Link from "next/link";

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold my-4">You have been signed out</h1>
      <p className="text-lg">Thank you for using VocaBuddy!</p>
      <p className="mt-4 text-sm">
        You can now close this page or return to the home page.
      </p>
      <Link href="/">
        <Button className="border-2 uppercase text-sm mt-4">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
