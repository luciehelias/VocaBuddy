import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { languages } from "@/data/languages";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const LanguageAddCard = ({
  targetLanguages,
  AddTargetLanguage: addTargetLanguage,
}: {
  targetLanguages: string[];
  AddTargetLanguage: (language: string) => void;
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");

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
            options={languages
              .filter((l) => !targetLanguages.includes(l.name))
              .map((l) => l.name)}
            value={selectedLang}
            onChange={setSelectedLang}
            placeholder="Ajoute une langue"
          />

          <Button
            variant="submit"
            onClick={() => {
              if (selectedLang) {
                addTargetLanguage(selectedLang);
                setSelectedLang("");
                setShowSelect(false);
              }
            }}
          >
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
};

export default LanguageAddCard;
