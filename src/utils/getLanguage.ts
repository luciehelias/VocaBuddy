import { languages } from "@/data/languages";

export const getLanguageName = (code: string) => {
  const language = languages.find((lang) => lang.code === code);
  return language ? language.name : "Langue inconnue";
};