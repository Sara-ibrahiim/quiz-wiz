import AuthImage from "../assets/auth-image.png";
import { Outlet } from "react-router-dom";
import ThemeToggle from "../modules/theme/ThemeToggle";

const AuthLayout = () => {
  return (

    <div className="relative flex gap-10 xl:ps-8 pt-6 pb-3 justify-center items-start bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight min-h-screen">
      <span className="absolute top-3 right-5">
        <ThemeToggle />
      </span>
      <div className="2xl:w-7/12 xl:w-7/12 sm:w-10/12  xs:w-11/12   ">
        <Outlet />
      </div>
      <div className="auth-image-container xs:hidden sm:hidden xl:inline  xl:w-6/12 2xl:w-5/12 ">
        <img
          src={AuthImage}
          alt="authentication image"
          className="xl:w-10/12 "
        />
      </div>
    </div>
  );
};

export default AuthLayout;
