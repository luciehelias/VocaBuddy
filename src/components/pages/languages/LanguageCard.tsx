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
      className="language-card gap-6 flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-black cursor-pointer"
    >
      <Image src={flagUrl} alt={`${name} flag`} width={100} height={100} />
      <p className="text-lg">{name}</p>
    </Link>
  );
}
