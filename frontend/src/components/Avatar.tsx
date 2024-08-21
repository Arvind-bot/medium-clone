interface AvatarProps {
  name: string;
  size?: "small" | "medium" | "large";
  bgColor?: string
}

export const Avatar = ({ name, size = "small", bgColor }: AvatarProps) => {
  const nameSplit = name?.split(" ") || null;
  const nameText = nameSplit
    ? `${nameSplit[0].charAt(0).toUpperCase()}${
        nameSplit[1]?.charAt(0).toUpperCase() || ""
      }`
    : "UK";
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size == "small"
          ? "w-8 h-8"
          : size == "medium"
          ? "w-11 h-11"
          : size == "large"
          ? "w-14 h-14"
          : ""
      } overflow-hidden ${bgColor || 'bg-gray-100'} rounded-full`}
    >
      <span
        className={`${
          size == "small"
            ? "text-sm"
            : size == "medium"
            ? "text-base"
            : size == "large"
            ? "text-lg"
            : ""
        } font-medium text-gray-600`}
      >
        {nameText}
      </span>
    </div>
  );
};
