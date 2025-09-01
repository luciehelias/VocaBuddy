import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { LANGUAGES } from "@/const/languages";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function LanguageAddCard({
  targetLanguages,
  addTargetLanguages: addTargetLanguages,
}: {
  targetLanguages: string[];
  addTargetLanguages: (language: string) => void;
}) {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");

  const handleSubmit = () => {
    if (selectedLang) {
      addTargetLanguages(LANGUAGES.find((e) => e.name === selectedLang)!.code);
      setSelectedLang("");
      setShowSelect(false);
    }
  };

  return (
    <div className="language-card">
      {!showSelect && (
        <>
          <CirclePlus
            size={50}
            className="flex-1 flex items-center justify-center"
            onClick={() => setShowSelect(true)}
          />
          <p className="text-lg text-center">Ajoute une autre langue</p>
        </>
      )}
      {showSelect && (
        <div className="flex flex-col items-center gap-6">
          <Dropdown
            options={LANGUAGES
              .filter((l) => !targetLanguages.includes(l.code))
              .map((l) => l.name)}
            value={selectedLang}
            onChange={setSelectedLang}
            placeholder="Ajoute une langue"
          />
          <Button variant="submit" onClick={handleSubmit}>
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}
