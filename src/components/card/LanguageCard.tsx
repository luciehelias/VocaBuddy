"use client";
import Image from "next/image";
import Link from "next/link";

type LanguageCardProps = {
  name: string;
  flagUrl: string;
  href: string;
};

export default function LanguageCard({
  name,
  flagUrl,
  href,
}: LanguageCardProps) {
  return (
    <Link
      href={href}
      className="language-card gap-6"
    >
      <Image
        src={flagUrl}
        alt={`${name} flag`}
        width={150}
        height={150}
      />
      <p className="text-lg">{name}</p>
    </Link>
  );
}
