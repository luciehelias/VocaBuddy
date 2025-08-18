export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string[];
  createdAt: string;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}
