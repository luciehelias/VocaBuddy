export interface IUser {
  username: string;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string[];
  createdAt: string;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}
