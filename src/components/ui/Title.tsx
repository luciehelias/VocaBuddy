import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  variant?: "sm" | "lg" | "flashcard";
};

const Title = ({ children, variant = "sm" }: TitleProps) => {
  const variants = {
    sm: "text-3xl font-bold",
    lg: "text-5xl font-bold",
    flashcard: "text-2xl",
  };

  return <h1 className={`${variants[variant]}`}>{children}</h1>;
};

export default Title;
