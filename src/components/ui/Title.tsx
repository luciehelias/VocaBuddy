import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  variant?: "sm" | "md" | "lg" | "flashcard";
};

export default function Title({ children, variant = "sm" }: TitleProps) {
  const variants = {
    sm: "text-3xl font-bold text-center",
    md: "text-4xl font-bold text-center",
    lg: "text-5xl font-bold text-center",
    flashcard: "text-2xl text-center",
  };

  return <h1 className={`${variants[variant]}`}>{children}</h1>;
}
