import { Outlet } from "react-router-dom";
import ThemeToggle from "../modules/theme/ThemeToggle";
import AuthImage from "../assets/auth-image.png";
const AuthLayout = () => {
  return (
    <div className="relative flex gap-10 px-10 py-10 justify-center items-center bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight min-h-screen">
      <span className="absolute top-3 right-5">
        <ThemeToggle />
      </span>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="auth-image-container h-full flex-1">
        <img src={AuthImage} alt="" className="w-11/12" />
      </div>
    </div>
  );
};

export default AuthLayout;
