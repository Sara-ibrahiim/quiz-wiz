import AuthButton from "../../../components/AuthButton";
import AuthLogo from "../../../components/AuthLogo";

const LoginRegister = () => {
  return (
    <div className="login-register-container">
      <AuthLogo />
      <AuthButton title="Sign In" />
    </div>
  );
};

export default LoginRegister;
