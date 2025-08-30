"use client";
import { IUser } from "@/types/user";
import { createContext, useContext } from "react";

const UserContext = createContext<IUser | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: IUser | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserData() {
  return useContext(UserContext);
}
