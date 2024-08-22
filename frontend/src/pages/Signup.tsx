import { useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import { SignupAuth } from "../components/SignupAuth";
import { useToken } from "../hooks";
import { useEffect } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const token = useToken();
  
  useEffect(() => {
    if(token) navigate('/blogs'); 
  },[]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-screen min-h-dvh max-w-[90rem] mx-auto">
      <div className="py-10">
        <SignupAuth />
      </div>
      <div className="py-10 bg-slate-100 hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
