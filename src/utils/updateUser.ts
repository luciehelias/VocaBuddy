// this function updates user's target languages or native language
export const updateUserLanguage = async (languageCode: string, isNative: boolean = false) => {
    if (!languageCode) return;

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: languageCode, isNative }),
      });
      
      if (!res.ok) throw new Error("Failed to update user");
    } catch (error) {
      console.error("Error adding a target language :", error);
    }
  };