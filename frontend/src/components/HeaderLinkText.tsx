import { Link, To } from "react-router-dom";

interface HeaderLinkTextType {
  heading?: string;
  text?: string;
  linkText?: string;
  toLink?: To;
}

export const HeaderLinkText = ({ heading, text, linkText, toLink }: HeaderLinkTextType) => {
  return (
    <div>
      {heading && (
        <div className="text-3xl font-extrabold">{heading}</div>
      )}
      <div className="mt-2 text-slate-500">
        {text || ""}
        {linkText && toLink && (
          <Link className={`${text ? "ml-1" : ""} underline`} to={toLink}>
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};
