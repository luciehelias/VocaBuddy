"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/types/user";
import Title from "@/ui/Title";

export default function HomePage() {
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <Title variant="sm">User</Title>
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
