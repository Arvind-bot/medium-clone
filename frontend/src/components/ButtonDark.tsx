import { MouseEvent } from "react";

interface ButtonDarkType {
  id?: string;
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonDark = ({ type, label, onClick }: ButtonDarkType) => {
  return (
    <button
      type={type || "button"}
      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
};