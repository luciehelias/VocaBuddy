import { Title } from "@/ui";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Title variant="sm">Bienvenue dans ton dashboard</Title>
      <Link href="/user/dashboard/train">
        <h2>Voir mes statistiques entraînement</h2>
      </Link>
      <h2>Voir mes statistiques examen</h2>
    </div>
  );
}
