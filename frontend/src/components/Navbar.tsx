import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Navbar = () => {
  const userName = "Arvind Kumar";
  return (
    <div className="border-b flex items-center justify-between px-5 py-3 max-w-[100rem] mx-auto">
      <Link to="/blogs" className="text-xl font-bold flex">
        Medium
      </Link>
      <div className="flex items-center">
        <Link to="/blog/create">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2"
          >
            New
          </button>
        </Link>
        <Avatar size="large" name={userName} />
      </div>
    </div>
  );
};
