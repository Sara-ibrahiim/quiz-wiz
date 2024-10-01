import { Outlet } from "react-router-dom";
import ThemeToggle from "../modules/theme/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className="relative px-10 py-10 bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight min-h-screen">
      <span className="absolute top-3 right-5">
        <ThemeToggle />
      </span>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
