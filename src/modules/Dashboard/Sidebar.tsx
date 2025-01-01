import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { RiHome6Line, RiLockPasswordLine } from "react-icons/ri";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import { TfiTimer, TfiWrite } from "react-icons/tfi";
import { SlLogout } from "react-icons/sl";
import { PiStudent } from "react-icons/pi";
import { FaRegFileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
export default function SideBar() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);
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
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#fce0ca",
                  color: "#70808f",
                },
              },
            }}
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
            {profile?.role === "Instructor" && (
              <MenuItem
                className="text-primaryDark dark:text-lightText  border-t border[#ececec-solid-1px]"
                icon={
                  <RiHome6Line className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
                }
                component={<NavLink to="/dashboard/home-page" />}
              >
                {" "}
                Dashboard
              </MenuItem>
            )}

            {profile?.role === "Instructor" && (
              <MenuItem
                className="text-primaryDark dark:text-lightText border-t border[#ececec-solid-1px] "
                icon={
                  <GrGroup className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl" />
                }
                component={<NavLink to="/dashboard/list-groups" />}
              >
                {" "}
                Groups
              </MenuItem>
            )}

            <MenuItem
              // style={profile?.role === "Student"?{borderTop:"#ececec solid 1px"}:undefined}
              className="text-primaryDark dark:text-lightText border-t border[#ececec-solid-1px]"
              icon={
                <TfiTimer className="bg-secondaryLight text-primaryDark px-1 rounded text-4xl   " />
              }
              component={<NavLink to="/dashboard/quizzes" />}
            >
              {" "}
              Quizzes
            </MenuItem>

            {profile?.role === "Instructor" && (
              <MenuItem
                className="text-primaryDark dark:text-lightText   border-t border[#ececec-solid-1px] "
                icon={
                  <TfiWrite className="bg-secondaryLight text-primaryDark p-1 rounded text-4xl" />
                }
                component={<NavLink to="/dashboard/question-bank" />}
              >
                {" "}
                Questions
              </MenuItem>
            )}

            {profile?.role === "Instructor" && (
              <MenuItem
                className="text-primaryDark dark:text-lightText  border-t border[#ececec-solid-1px]  "
                icon={
                  <PiStudent className="bg-secondaryLight text-primaryDark p-1 rounded text-4xl" />
                }
                component={<NavLink to="/dashboard/Students"/>}
              >
                {" "}
                Students
              </MenuItem>
            )}

            <MenuItem
              className="text-primaryDark dark:text-lightText  border-t border[#ececec-solid-1px]  "
              icon={
                <FaRegFileAlt className="bg-secondaryLight text-primaryDark p-1 rounded text-4xl" />
              }
              component={<NavLink to="/dashboard/results"/>}
            >
              {" "}
              Results
            </MenuItem>
            {/* ) : (
              ""
            )} */}

            <MenuItem
              className="text-primaryDark dark:text-lightText   border-t border[#ececec-solid-1px]  "
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
              className="text-primaryDark dark:text-lightText border-b  border-t border[#ececec-solid-1px]   "
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
