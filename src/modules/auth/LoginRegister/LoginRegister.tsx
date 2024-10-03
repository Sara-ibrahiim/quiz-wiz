import { useState } from "react";
import AuthLogo from "../../../components/AuthLogo";
import AuthTitle from "./AuthTitle";
import LoginForm from "./LoginForm";

const LoginRegister = () => {
  const [mode, setMode] = useState("Login");
  return (
    <div className="login-register-container h-full flex flex-col justify-between 2xl:max-w-4xl">
      <AuthLogo />
      <AuthTitle mode={mode} setMode={setMode} />
      {mode === "Login" && <LoginForm />}
      {/* {mode === "Register" && <LoginForm />} */}
    </div>
  );
};

export default LoginRegister;
