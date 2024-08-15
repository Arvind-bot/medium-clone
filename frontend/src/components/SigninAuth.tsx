import { SigninInput } from "@arvind-debug/medium-common";
import { useState } from "react";
import { HeaderLinkText } from "./HeaderLinkText";
import { LabelledInput } from "./LabelledInput";
import { ButtonDark } from "./ButtonDark";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SigninAuth = () => {
  const navigate = useNavigate();
  const [signinInputs, setSigninInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInputs
      );
      const jwt = response?.data?.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.error("error", error);
      alert("Sorry, something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-full mx-auto w-[80%] md:w-[60%] flex flex-col items-center justify-center">
      <div className="text-center">
        <HeaderLinkText
          heading="Signin to an account"
          text="Do not have an account?"
          linkText="Signup"
          toLink="/signup"
        />
      </div>
      <div className="w-full mt-8 flex flex-col gap-3">
        <LabelledInput
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          required
          onChange={(e) => {
            setSigninInputs(() => ({
              ...signinInputs,
              email: e.target.value,
            }));
          }}
        />
        <LabelledInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          required
          onChange={(e) => {
            setSigninInputs(() => ({
              ...signinInputs,
              password: e.target.value,
            }));
          }}
        />

        <div className="w-full">
          <ButtonDark onClick={sendRequest} label="Signin" />
        </div>
      </div>
    </div>
  );
};
