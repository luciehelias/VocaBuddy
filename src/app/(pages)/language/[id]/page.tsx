import ActionCard from "@/components/card/ActionCard";
import { Title, LinkButton } from "@/ui";
import { COLORS } from "@/const/ui";
import { getLanguageName } from "@/utils/language";
import { Dumbbell, BicepsFlexed, Lightbulb } from "lucide-react";
import Image from "next/image";

export default async function LanguageMenu({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const language = getLanguageName(id);

  if (!id || !language) return <div>No language found</div>;

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      <div className="flex justify-center gap-6 w-full">
        <Image
          src={`/assets/flags/${id}.png`}
          alt={`Drapeau de ${language}`}
          width={40}
          height={40}
        />
        <Title>Hey! Prêt à travailler ton {language} ?</Title>
      </div>
      <ul className="flex gap-8">
        <li>
          <ActionCard href={`/flashcards/${id}/create`} type="creation">
            <Lightbulb size={64} color={COLORS.creation} />
            <span className="font-bold">Mode Création</span>
          </ActionCard>
        </li>
        <li>
          <ActionCard href={`/language/${id}/train/`} type="training">
            <Dumbbell size={64} color={COLORS.training} />
            <span className="font-bold">Mode Entraînement</span>
          </ActionCard>
        </li>
        <li>
          <ActionCard href={`/language/${id}/test`} type="test">
            <BicepsFlexed size={64} color={COLORS.test} />
            <span className="font-bold">Mode Examen</span>
          </ActionCard>
        </li>
      </ul>
      <LinkButton href={`/flashcards/${id}`} text="Gérer les flashcards" />
    </div>
  );
}
