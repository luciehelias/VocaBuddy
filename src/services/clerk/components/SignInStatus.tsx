import { Suspense } from "react";
import { SignedOut as ClerkSignedOut } from "@clerk/nextjs";
import { SignedIn as ClerkSignedIn } from "@clerk/nextjs";

export function SignedIn({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
        <ClerkSignedIn>
            {children}
        </ClerkSignedIn>
    </Suspense>
  )
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
        <ClerkSignedOut>
            {children}
        </ClerkSignedOut>
    </Suspense>
  )
}