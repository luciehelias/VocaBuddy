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
      <h1 className="text-xl">User</h1>
      {!users && <p>No User Found</p>}
      <ul>
        {users?.map((u) => (
          <li>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
