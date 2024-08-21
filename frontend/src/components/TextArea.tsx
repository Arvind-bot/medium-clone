import { ChangeEvent } from "react";

export const TextArea = ({
  onChange,
  placeholder,
}: {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}) => {
  return (
    <textarea
      onChange={onChange}
      id="message"
      rows={12}
      className="mb-2 block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder || "Enter text here..."}
    ></textarea>
  );
};
