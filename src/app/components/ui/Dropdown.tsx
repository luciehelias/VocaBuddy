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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-2xl border-gray-300 text-gray-500"
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
  );
};

export default Dropdown;
