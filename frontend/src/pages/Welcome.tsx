import { useNavigate } from "react-router-dom";
import { ButtonBlue } from "../components/ButtonBlue";
import { ButtonDark } from "../components/ButtonDark";
import { useToken } from "../hooks";

export const Welcome = () => {
  const isAuthenticated = useToken();
  const navigate = useNavigate();
  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="block text-slate-900 py-2 text-6xl font-extrabold text-center">{`Welcome ${isAuthenticated ? 'back ' : ''}to medium!`}</div>
        <div className="flex gap-2">
          {isAuthenticated && (
            <ButtonDark label="View Blogs" onClick={() => navigate("/blogs")} />
          )}
          {!isAuthenticated && (
            <>
              <ButtonBlue size="small" label="Signin" onClick={() => navigate("/signin")} />
              <ButtonDark label="Signup" onClick={() => navigate("/signup")} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
