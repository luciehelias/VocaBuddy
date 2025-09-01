import { useState } from "react";
import { useUserData } from "@/contexts/userContext";

export const useAvatar = (initialAvatarUrl?: string) => {
  const user = useUserData();
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    initialAvatarUrl ?? user?.avatarUrl ?? ""
  );

  // Select a file and create a preview immediately
  const selectFile = (f: File) => {
    setFile(f);
    const imagePreview = URL.createObjectURL(f);
    setAvatarUrl(imagePreview);
  };

  // Convert a File object to base64 string for upload
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) resolve(reader.result as string);
        else reject("Failed to read file");
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const uploadAvatar = async (): Promise<string | undefined> => {
    if (!file || !user?.clerkId) return;

    try {
      const base64 = await fileToBase64(file);

      const uploadResponse = await fetch("/api/user/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, userId: user.clerkId }),
      });
      const uploadData = await uploadResponse.json();
      const newAvatarUrl = uploadData.url;

      const patchResponse = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: newAvatarUrl }),
      });
      if (!patchResponse.ok) throw new Error("Failed to update avatar");

      const patchData = await patchResponse.json();
      setAvatarUrl(patchData.user.avatarUrl);

      return patchData.user.avatarUrl;
    } catch (err) {
      console.error("Error uploading avatar:", err);
      throw err;
    }
  };

  return { avatarUrl, file, selectFile, uploadAvatar };
};
