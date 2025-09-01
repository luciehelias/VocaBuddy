import { LANGUAGES } from "@/const/languages";

export const getLanguageName = (code: string) => {
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language ? language.name : "Langue inconnue";
};