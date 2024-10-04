import { useState } from "react";
import AuthLogo from "../../../components/AuthLogo";
import AuthTitle from "../LoginRegister/AuthTitle";
import AuthButton from "./../../../components/AuthButton";

const ForgotPassword = () => {
  const [mode, setMode] = useState("forgot");
  return;
  <div className="forget-password-container h-full flex flex-col justify-between ">
    <AuthLogo />
    <div className="pt-10">
      <AuthTitle mode={mode} />
    </div>
    <AuthButton title="Forget Password" />
  </div>;
};

export default ForgotPassword;
