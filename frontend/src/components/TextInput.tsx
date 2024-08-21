import { ChangeEvent } from "react";

export const TextInput = ({
  onChange,
  placeholder,
}: {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder || "Enter input here"}
      type="text"
      id="large-input"
      className="mt-7 mb-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-3xl font-extrabold focus:ring-blue-500 focus:border-blue-500"
    />
  );
};
