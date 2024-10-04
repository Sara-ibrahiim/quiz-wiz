import AuthImage from "../assets/auth-image.png";
import { Outlet } from "react-router-dom";
import ThemeToggle from "../modules/theme/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className="relative flex gap-10 px-10 max-h-screen py-10 justify-center items-start bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight min-h-screen">
      <span className="absolute top-3 right-5">
        <ThemeToggle />
      </span>
      <div className="2xl:w-7/12 xl:w-7/12  h-full">
        <Outlet />
      </div>
      <div className="auth-image-container h-full xl:w-6/12 2xl:w-5/12">
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
