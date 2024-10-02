import { useState } from "react";
import AuthButton from "../../../components/AuthButton";
import AuthLogo from "../../../components/AuthLogo";
import AuthTitle from "./AuthTitle";

const LoginRegister = () => {
  const [mode, setMode] = useState("Login");
  return (
    <div className="login-register-container h-full flex flex-col justify-between ">
      <AuthLogo />
      <div className="pt-10">
        <AuthTitle mode={mode} />
      </div>
      <AuthButton title="Sign In" />
    </div>
  );
};

export default LoginRegister;
