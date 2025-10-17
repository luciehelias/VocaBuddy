type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "auth"
    | "primary"
    | "submit"
    | "option"
    | "icon"
    | "delete"
    | "edit"
    | "cancel"
    | "save";
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
    primary: "border-2 uppercase rounded-xl",
    submit:
      "border-2 bg-emerald-200 w-full uppercase rounded-xl hover:bg-emerald-300 ",
    option: "flex justify-center gap-2",
    icon: "border-2 rounded-xl flex flex-col items-center gap-12 min-w-60 p-8 text-white",
    delete:
      "border-2 bg-red-300 w-38 uppercase rounded-xl hover:bg-red-400 hover:text-white",
    edit: "border-2 bg-blue-300 w-38 uppercase rounded-xl hover:bg-blue-400 hover:text-white",
    cancel:
      "border-2 bg-gray-300 w-38 uppercase rounded-xl hover:bg-gray-400 hover:text-white",
    save: "border-2 bg-emerald-200 w-38 uppercase rounded-xl hover:bg-emerald-300 hover:text-white",
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
