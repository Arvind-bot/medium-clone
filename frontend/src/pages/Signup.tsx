import { Quote } from "../components/Quote";
import { SignupAuth } from "../components/SignupAuth";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-screen min-h-dvh">
      <div className="py-10">
        <SignupAuth />
      </div>
      <div className="py-10 bg-slate-100 hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
