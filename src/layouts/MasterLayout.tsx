import { Outlet } from "react-router-dom";
import Navbar from "../modules/Dashboard/Navbar";
import Sidebar from "@/modules/Dashboard/Sidebar";
import { useState } from "react";
import LoadingPencil from "@/components/LoadingPencil/LoadingPencil";

const MasterLayout = () => {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  },1400);
  return (
    <>
    {isLoading ? <LoadingPencil/> :
    
    <div className="flex">
    <Sidebar />

    <div className="w-full">
      <Navbar />
      <div className="master-layout bg-lightText dark:bg-primaryDark text-primaryDark dark:text-lightText ">
        <Outlet />
      </div>
    </div>
  </div>
    }

    </>
  );
};

export default MasterLayout;
