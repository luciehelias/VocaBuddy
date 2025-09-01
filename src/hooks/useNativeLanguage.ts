import { useState } from "react";

export const useNativeLanguage = (initialLanguages: string) => {
  const [nativeLanguage, setNativeLanguage] = useState(initialLanguages);

  const addNativeLanguage = async (language: string) => {
    if (!language) return;

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nativeLanguage: language }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      setNativeLanguage(data.user.nativeLanguage ?? []);
    } catch (error) {
      console.error("Error adding a native language :", error);
    }
  };

  return { nativeLanguage, addNativeLanguage };
};
