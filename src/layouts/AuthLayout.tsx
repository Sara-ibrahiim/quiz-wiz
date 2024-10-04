import AuthImage from "../assets/auth-image.png";
import { Outlet } from "react-router-dom";
import ThemeToggle from "../modules/theme/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className="relative flex gap-10 px-10 py-10 justify-center  bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight min-h-screen">
      <span className="absolute top-3 right-5">
        <ThemeToggle />
      </span>
      <div className="w-7/12">
        <Outlet />
      </div>
      <div className="auth-image-container h-full w-5/12">
        <img
          src={AuthImage}
          alt="authentication image"
          className="xl:w-11/12 "
        />
      </div>
    </div>
  );
};

export default AuthLayout;
