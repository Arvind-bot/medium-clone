import { Quote } from "../components/Quote";
import { SigninAuth } from "../components/SigninAuth";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-screen min-h-dvh max-w-[90rem] mx-auto">
      <div className="py-10">
        <SigninAuth />
      </div>
      <div className="py-10 bg-slate-100 hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
