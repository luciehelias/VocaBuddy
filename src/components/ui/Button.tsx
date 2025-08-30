type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "auth" | "primary" | "submit" | "option";
  className?: string;
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle = "p-2 cursor-pointer";

  const variants = {
    auth: "border-2 uppercase text-sm w-38 rounded-md",
    primary: "border-2 uppercase rounded-xl",
    submit:
      "border-1 bg-emerald-200 w-full uppercase rounded-xl hover:bg-emerald-300 ",
    option: "flex justify-center gap-2",
  };

  return (
    <button
      type="button"
      className={`${baseStyle} ${className} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
