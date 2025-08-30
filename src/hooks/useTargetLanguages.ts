import { useState } from "react";

export const useTargetLanguages = (initialLanguages: string[] = []) => {
  const [targetLanguages, setTargetLanguages] = useState(initialLanguages);

  const addTargetLanguage = async (language: string) => {
    if (!language) return;

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetLanguage: [language] }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      setTargetLanguages(data.user.targetLanguage ?? []);
    } catch (error) {
      console.error("Error adding a target language :", error);
    }
  };

  return { targetLanguages, addTargetLanguage };
};
