type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "auth" | "primary";
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const baseStyle = "p-2 cursor-pointer";

  const variants = {
    auth: "border-2 uppercase text-sm w-38 rounded-md",
    primary: "w-full rounded-xl",
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
