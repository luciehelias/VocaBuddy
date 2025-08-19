import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  const baseStyle = "p-2 w-38 rounded-md";

  return (
    <button type="button" className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
