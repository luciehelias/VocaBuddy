import Link from "next/link";
import Button from "./Button";
import { ArrowBigRight } from "lucide-react";

interface LinkButtonProps {
  href: string;
  text: string;
}

export default function LinkButton({ href, text }: LinkButtonProps) {
  return (
    <Link href={href}>
      <Button className="flex items-center gap-2 creation-color--reverse">
        <ArrowBigRight />
        <p>{text}</p>
      </Button>
    </Link>
  );
}
