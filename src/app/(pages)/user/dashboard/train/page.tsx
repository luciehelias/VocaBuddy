import { Title } from "@/components/ui";

export default function DashboardTrain() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Title variant="md">Statistiques d'entraînement</Title>
      <p>Voici vos statistiques d'entraînement récentes.</p>
    </div>
  );
}
