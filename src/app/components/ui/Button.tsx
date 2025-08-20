type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "auth" | "secondary";
};

const Button = ({
  children,
  className = "",
  variant = "secondary",
  ...props
}: ButtonProps) => {
  const baseStyle = "p-2 w-38 rounded-md cursor-pointer";

  const variants = {
    auth: "border-2 uppercase text-sm",
    secondary: "w-full rounded-xl",
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
