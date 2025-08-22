"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/types/user";

export default function HomePage() {
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl mb-8">All Users</h1>
      {!users && <p>No User Found</p>}
      <ul className="p-8 flex items-center justify-start gap-2 flex-wrap">
        {users?.map((user) => (
          <li key={user.username} className="flex flex-col items-center gap-2 p-4 border rounded mb-4">
            <img src={user.avatarUrl} alt={`${user.username}'s avatar`} className="w-10 h-10 rounded-full" />
            <span>Username : {user.username}</span>
            <span>Native Language : {user.nativeLanguage.toUpperCase()}</span>
            <span>Target Language : {user.targetLanguage.join(", ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
