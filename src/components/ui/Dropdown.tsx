import { ChevronDown } from "lucide-react";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Choisir une catégorie",
}: DropdownProps) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 pr-8 border rounded-2xl border-gray-300 text-gray-500 appearance-none cursor-pointer"
      >
        <option value="" hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-400">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

export default Dropdown;
