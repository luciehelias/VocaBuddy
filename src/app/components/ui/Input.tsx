type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
};

const Input = ({ value, onChange, placeholder, type = "text" }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white p-2 rounded-2xl border border-gray-300 w-full"
    />
  );
};

export default Input;
