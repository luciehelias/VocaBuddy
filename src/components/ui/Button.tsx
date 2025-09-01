type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "auth" | "primary" | "submit" | "option" | "icon";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle = "p-2 cursor-pointer";

  const variants = {
    auth: "border-2 uppercase text-sm w-38 rounded-md hover:bg-black hover:text-white",
    primary: "border-2 uppercase rounded-xl hover:bg-emerald-200",
    submit:
      "border-1 bg-emerald-200 w-full uppercase rounded-xl hover:bg-emerald-300 ",
    option: "flex justify-center gap-2",
    icon: "border-2 rounded-xl flex flex-col items-center gap-12 min-w-60 p-8 text-white",
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
}
