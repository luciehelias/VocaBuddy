"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

export function ClerkProvider({ children }: { children: React.ReactNode }) {

  return (
    <Suspense>
      <OriginalClerkProvider
        appearance={{
          variables: {
            colorText: "#080e0b",
          },
        }}
        afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || "/"}
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
        signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up"}
        signUpFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || "/"}
      >
        {children}
      </OriginalClerkProvider>
    </Suspense>
  );
}
