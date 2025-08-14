"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main>
      <h1 className="text-xl">Users</h1>
      {users.length === 0 && <p>No User Created Yet</p>}
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
