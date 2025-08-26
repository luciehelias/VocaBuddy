"use client";

import Image from "next/image";

type LanguageCardProps = {
  name: string;
  flagUrl: string;
};

export default function LanguageCard({ name, flagUrl }: LanguageCardProps) {
  return (
    <div className="language-card gap-6">
      <Image src={flagUrl} alt={`${name} flag`} width={200} height={200} />
      <p className="text-lg">{name}</p>
    </div>
  );
}
