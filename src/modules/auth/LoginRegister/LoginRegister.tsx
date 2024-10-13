import { useState } from "react";
import AuthLogo from "../../../components/AuthLogo";
import AuthTitle from "./AuthTitle";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginRegister = () => {
  const [mode, setMode] = useState("Login");
  return (
    <div className="login-register-container h-full flex flex-col justify-between 2xl:max-w-4xl">
      <AuthLogo />
      <AuthTitle mode={mode} setMode={setMode} />
      {mode === "Login" && <LoginForm />}
      {mode === "Register" && <RegisterForm setMode={setMode} />}
    </div>
  );
};

export default LoginRegister;
