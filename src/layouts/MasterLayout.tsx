import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MasterLayout = () => {
  return (
    <>
      <Navbar />
      <div className="master-layout bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight">
        <Outlet />
      </div>
    </>
  );
};

export default MasterLayout;
