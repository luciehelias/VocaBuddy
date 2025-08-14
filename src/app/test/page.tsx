"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [dbStatus, setDbStatus] = useState<string>("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => setDbStatus(data.message))
      .catch(() => setDbStatus("❌ Unable to reach server"));
  }, []);

  return (
    <main>
      <h1>Database Status</h1>
      <p>{dbStatus}</p>
    </main>
  );
}
