"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { LANGUAGES } from "@/const/languages";
import { useUserData } from "@/contexts/userContext";
import { useAvatar } from "@/hooks/useAvatar";
import { updateUserLanguage } from "@/utils/updateUserLanguage";
import { getUserTargetLanguageNames } from "@/utils/language";

export default function ProfileSetup() {
  const user = useUserData();
  const router = useRouter();
  const [selectedTargetLang, setSelectedTargetLang] = useState("");
  const [selectedNativeLang, setSelectedNativeLang] = useState("");
  const [error, setError] = useState("");
  const [pictureName, setPictureName] = useState("Aucun fichier choisi");
  const { avatarUrl, file, selectFile, uploadAvatar } = useAvatar(
    user?.avatarUrl
  );
  const userTargetLanguages = getUserTargetLanguageNames(user?.targetLanguages);

  const handleSubmit = async () => {
    if (!selectedNativeLang || !selectedTargetLang) {
      setError(
        "Vous devez sélectionner une langue maternelle et une langue à apprendre."
      );
      return;
    }
    try {
      if (file) {
        await uploadAvatar();
      }
      if (selectedTargetLang) {
        await updateUserLanguage(
          LANGUAGES.find((e) => e.name === selectedTargetLang)!.code
        );
      }
      if (selectedNativeLang) {
        await updateUserLanguage(
          LANGUAGES.find((e) => e.name === selectedNativeLang)!.code,
          true
        );
      }
      setError("");
      router.push("/languages");
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <div className="flex flex-col gap-12 border-1 p-12 rounded-2xl">
      <Title>Complétez votre profil de VocaBuddy</Title>
      <div className="flex flex-col gap-4 ">
        <p className="text-xl">
          Modifie ton avatar{" "}
          <span className="text-sm">(si tu le souhaites)</span>
        </p>
        <img
          src={avatarUrl || user?.avatarUrl}
          alt="Avatar"
          className="rounded-full w-18 h-18"
        />
        <div className="flex items-center gap-12 w-full">
          <label
            htmlFor="avatar"
            className="cursor-pointer px-4 py-2 bg-emerald-200 border-1 rounded-xl hover:bg-emerald-300"
          >
            Choisir ta photo de profil
          </label>
          <input
            id="avatar"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                selectFile(e.target.files[0]);
                setPictureName(e.target.files[0].name);
              } else {
                setPictureName("Aucun fichier choisi");
              }
            }}
            accept="image/*"
            className="hidden"
          />
          <p className="text-gray-500">{pictureName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">Quelle est votre langue maternelle ?</p>
        <Dropdown
          options={LANGUAGES
            .filter((l) => !selectedNativeLang.includes(l.code))
            .map((l) => l.name)}
          value={selectedNativeLang}
          onChange={(value) => {
            setSelectedNativeLang(value);
            if (error) setError("");
          }}
          placeholder="Ajoute une langue"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">
          Quelle langue voulez-vous apprendre en premier ?
        </p>
        <Dropdown
          options={LANGUAGES
            .filter((l) => !userTargetLanguages.includes(l.code))
            .map((l) => l.name)}
          value={selectedTargetLang}
          onChange={(value) => {
            setSelectedTargetLang(value);
            if (error) setError("");
          }}
          placeholder="Ajoute une langue"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        variant="submit"
        onClick={handleSubmit}
        className={`${
          !selectedNativeLang || !selectedTargetLang
            ? "bg-gray-300 cursor-not-allowed"
            : ""
        }`}
      >
        Compléter mon profil
      </Button>
    </div>
  );
}
