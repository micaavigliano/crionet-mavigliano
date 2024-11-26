import { ChangeEvent, ReactNode } from "react";

interface SelectProps {
  name: string;
  items: {
    code: string;
    name: string;
  }[];
  defaultValue?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  size?: number;
  icon: ReactNode;
  option: string;
}

const Select = ({
  name,
  items,
  defaultValue = "",
  value,
  onChange,
  size,
  icon,
  option
}: SelectProps) => {

  return (
    <div className="appearance-none px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex flex-row gap-5 w-full lg:w-1/4">
      {icon}
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        size={size}
        className="bg-transparent flex-1"
      >
        <option value="">{option}</option>
        {items?.map((item, index) => (
          <option
            key={index}
            value={item.code}
            disabled={!item.code}
            className="font-bold"
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>

  );
};

export default Select;
