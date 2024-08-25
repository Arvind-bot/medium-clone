import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { LogoutIcon } from "./Logout";

export const Navbar = () => {
  const userName = "U K";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="border-b flex items-center justify-between px-5 py-3 max-w-[100rem] mx-auto">
      <Link to="/blogs" className="text-xl font-bold flex">
        Medium
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/blog/create">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            New
          </button>
        </Link>
        <Avatar size="large" name={userName} />
        <span onClick={handleLogout} className=" cursor-pointer bg-slate-200 rounded-full w-14 h-14 flex items-center justify-center hover:bg-slate-300">
          <LogoutIcon className="text-red-500 h-6"/>
        </span>
      </div>
    </div>
  );
};
