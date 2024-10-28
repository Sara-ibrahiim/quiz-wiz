import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { RiHome6Line, RiLockPasswordLine } from "react-icons/ri";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import { TfiTimer, TfiWrite } from "react-icons/tfi";
import { SlLogout } from "react-icons/sl";
import { PiStudent } from "react-icons/pi";
import { LucideFileSpreadsheet } from "lucide-react";
import { FaRegFileAlt } from "react-icons/fa";
export default function SideBar() {
  const [isCollapse, setIsCollapse] = React.useState(() => {
    const storedValue = localStorage.getItem("isCollapse");
    if (!storedValue) return false;

    return JSON.parse(storedValue);
  });
  const togglerCollapse = () => {
    if (window.innerWidth > 850) {
      if (!isCollapse) {
        setIsCollapse(true);
        localStorage.setItem("isCollapse", JSON.stringify(true));
      } else {
        const newCollapseState = !isCollapse;
        setIsCollapse(newCollapseState);
        localStorage.setItem("isCollapse", JSON.stringify(newCollapseState));
      }
    }
  };

  // const togglerCollapse = () => {
  //   const newCollapseState = !isCollapse;
  //   setIsCollapse(newCollapseState);
  //   localStorage.setItem("isCollapse", JSON.stringify(newCollapseState));
  // };

  const navigate = useNavigate();

  return (
    <>
      <div
        className="bg-sidebar bg-lightText  dark:bg-primaryDark "
        style={{ position: "sticky", top: "0", left: "0", height: "100vh" }}
      >
        <Sidebar collapsed={isCollapse} className="h-full">
          <Menu
            className="h-full "
            // menuItemStyles={{
            //   button: {
            //     [`&.active`]: {
            //      // backgroundColor: "",
            //     // color: "#a4b5c5",
            //     },
            //   },
            // }}
          >
            <MenuItem
              className="text-primaryDark dark:text-lightText  firstRow-sideBar py-3 text  "
              onClick={togglerCollapse}
              icon={
                <FiAlignJustify
                  className="text-primaryDark dark:text-lightText"
                  style={{
                    fontSize: "20rem",
                    transition: "all 300ms",
                  }}
                />
              }
            >
              <div className="block xs:hidden"></div>{" "}
            </MenuItem>

            <MenuItem
              className="text-primaryDark dark:text-lightText sec-row "
              icon={
                <RiHome6Line className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
              }
              component={<NavLink to="/dashboard" />}
            >
              {" "}
              Dashboard
            </MenuItem>
            {/* { ? ( */}
            <MenuItem
              className="text-primaryDark dark:text-lightText "
              icon={
                <GrGroup className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
              }
              component={<NavLink to="/dashboard/list-groups" />}
            >
              {" "}
              Groups
            </MenuItem>
            {/* ) : (
              ""
            )} */}

            <MenuItem
              className="text-primaryDark dark:text-lightText  "
              icon={
                <TfiTimer className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
              }
              component={<NavLink to="/dashboard/quizzes" />}
            >
              {" "}
              Quizzes
            </MenuItem>

            <MenuItem
              className="text-primaryDark dark:text-lightText  "
              icon={
                <TfiWrite className="bg-secondaryLight text-primaryDark p-1 rounded text-4xl" />
              }
              component={<NavLink to="/dashboard/question-bank" />}
            >
              {" "}
              Questions
            </MenuItem>
            <MenuItem
              className="text-primaryDark dark:text-lightText  "
              icon={
                <PiStudent className="bg-secondaryLight text-primaryDark p-1 rounded text-4xl" />
              }
              // component={<NavLink to="" />}
            >
              {" "}
              Students
            </MenuItem>
            {/* 
            { ( */}
            <MenuItem
              className="text-primaryDark dark:text-lightText  "
              icon={
                <FaRegFileAlt className="bg-secondaryLight text-primaryDark p-1 rounded text-4xl" />
              }
              component={<NavLink to="/dashboard/Results" />}
            >
              {" "}
              Results
            </MenuItem>
            {/* ) : (
              ""
            )} */}

            <MenuItem
              className="text-primaryDark dark:text-lightText   "
              //   onClick={}
              icon={
                <RiLockPasswordLine className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
              }
              component={<NavLink to="/change-password" />}
            >
              {" "}
              ChangePassword
            </MenuItem>

            <MenuItem
              className="text-primaryDark dark:text-lightText  "
              icon={
                <SlLogout className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
              }
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/auth");
              }}
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
