import AuthButton from "../../../components/AuthButton";
import ThemeToggle from "../../theme/ThemeToggle";

const LoginRegister = () => {
  return (
    <div>
      <AuthButton title="Sign In" />
      <ThemeToggle />
    </div>
  );
};

export default LoginRegister;
