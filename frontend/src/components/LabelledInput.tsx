import { ChangeEvent } from "react";
interface LabelledInputType {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = ({
  id,
  label,
  placeholder,
  type,
  required,
  onChange,
}: LabelledInputType) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-bold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};
