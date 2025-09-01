import Button from "@/components/ui/Button";
import Link from "next/link";

type ActionType = "creation" | "training" | "test";

export default function ActionCard({
  href,
  type,
  children,
}: {
  href: string;
  type: ActionType;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Button variant="icon" className={`${type}-color`}>
        {children}
      </Button>
    </Link>
  );
}
