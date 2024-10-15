import { Outlet } from "react-router-dom";
import Navbar from "../modules/Dashboard/Navbar";
import Sidebar from "@/modules/Dashboard/Sidebar";

const MasterLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Navbar />
          <div className="master-layout bg-lightText dark:bg-primaryDark text-primaryDark dark:text-lightText ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
