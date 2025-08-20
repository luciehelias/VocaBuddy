"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { delius } from "@/fonts/delius";

const Header = () => {
  return (
    <div className="flex items-center justify-between pr-2">
      <Image
        src="/assets/logo.png"
        alt="logo vocabuddy"
        width={100}
        height={100}
        priority
      />
      <h1 className={`text-5xl font-bold p-4 ${delius.className}`}>
        VocaBuddy
      </h1>
      <div className="flex flex-col items-center gap-4">
        <Button
          className="border-2 uppercase text-sm"
          onClick={() => console.log("Connect")}
        >
          Se connecter
        </Button>
        <Button
          className="border-2 uppercase text-sm"
          onClick={() => console.log("Sign in")}
        >
          S'inscrire
        </Button>
      </div>
    </div>
  );
};

export default Header;
