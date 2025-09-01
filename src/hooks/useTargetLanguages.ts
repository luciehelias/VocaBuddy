import { useState } from "react";

export const useTargetLanguages = (initialLanguages: string[] = []) => {
  const [targetLanguages, setTargetLanguages] = useState(initialLanguages);

  const addTargetLanguages = async (language: string) => {
    if (!language) return;

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetLanguages: [language] }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      setTargetLanguages(data.user.targetLanguages ?? []);
    } catch (error) {
      console.error("Error adding a target language :", error);
    }
  };

  return { targetLanguages, addTargetLanguages };
};
