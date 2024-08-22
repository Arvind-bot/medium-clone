import { MouseEvent } from "react";

interface ButtonBlueType {
  id?: string;
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  size?: "small" | "medium";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonBlue = ({
  type,
  label,
  onClick,
  disabled,
  size = "medium",
}: ButtonBlueType) => {
  const btnClassNames =
    size === "small"
      ? " px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
      : "px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300";
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={btnClassNames}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
