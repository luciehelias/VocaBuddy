import Image from "next/image";
import { Input } from "@/ui";

type LanguageInputWithFlagProps = {
  languageCode: string;
  languageName: string;
  value: string;
  onChange: (value: string) => void;
};

export default function LanguageInputWithFlag({
  languageCode,
  languageName,
  value,
  onChange,
}: LanguageInputWithFlagProps) {
  return (
    <div className="flex gap-8 justify-between w-full items-center">
      <Image
        src={`/assets/flags/${languageCode}.png`}
        alt={`Drapeau de ${languageName}`}
        width={20}
        height={20}
        style={{ width: "32px", height: "32px", objectFit: "contain" }}
        unoptimized
      />
      <Input
        placeholder={`Mot en ${languageName}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
