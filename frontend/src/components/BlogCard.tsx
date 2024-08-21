import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  blogId: string;
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}

export const BlogCard = ({
  blogId,
  authorName,
  publishedDate,
  title,
  content,
}: BlogCardProps) => {
  const mins = Math.ceil(content.length / 100);
  const minsText = `${mins} min read`;

  return (
    <div className="border-b border-slate-200 pt-4 pb-7">
      <div className="text-base">
        <Avatar name={authorName} />
        <span className="ml-2">{authorName}</span>
        <span className="text-slate-500">
          <span className="ml-1">&#8226;</span>
          <span className="ml-1">{publishedDate}</span>
        </span>
      </div>
      <Link to={`/blog/${blogId}`}>
        <div className="block text-slate-900 py-2 text-3xl font-extrabold">
          {title}
        </div>
      </Link>
      <div className="text-slate-800 text-xl">
        {content?.length > 100 ? `${content.slice(0, 100)}...` : content}
      </div>
      <div className="mt-8 text-base text-slate-500">{minsText}</div>
    </div>
  );
};
