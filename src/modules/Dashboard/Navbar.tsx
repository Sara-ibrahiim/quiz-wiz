import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearAuth } from "../../store/authSlice";
import ThemeToggle from "../theme/ThemeToggle";
import { RootState } from "@/store/store";
import iconQuiz from "../../assets/iconQize.png";
import { BiSolidAlarmAdd } from "react-icons/bi";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const profile = useSelector((state: RootState) => state.auth.profile);

  // Handle logout
  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.clear();
    navigate("/auth");
  };

  // Show or hide the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar flex grid grid-cols-12 dark:bg-primaryDark text-primaryDark dark:text-lightText ps-1 border-b-[1px] border-[#ECECEC] pe-3">
      <div className="flex-1 pt-5 xs:text-sm  md:col-span-7 sm:col-span-4 xs:col-span-3 text-primaryDark dark:text-lightText ms-3 font-bold mt-2 me-2">
        Dashboard
      </div>
      <div className="md:col-span-3 sm:col-span-4 xs:col-span-4  md:ms-3  md:ml-auto">
        <div className="flex md:mt-5 xs:mt-6 md:px-0 border-[1px] cursor-pointer md:ml-auto rounded-full md:pe-2 sm:mt-6 md:me-5 xs:w-11/12 sm:w-8/12 md:w-[200px]">
          <BiSolidAlarmAdd className=" md:ms-10 md:text-4xl xs:text-2xl  sm:text-3xl sm:ms-4" />
          <p className="mt-1 ms-2 font-bold md:text-lg xs:text-sm sm:text-base">
            New Quiz
          </p>
        </div>
      </div>
      <div className="md:relative md:col-span-2 sm:col-span-4 xs:col-span-3 xs:pt-3">
        <div className="flex"></div>

        {/* User Avatar Button */}

        <div className="flex items-center border-l-[1px] md:py-[15px] sm:py-[22px] xs:py-[7px] sm:pt-2  ">
          <div className="md:mx-6 xs:mx-2 sm:mx-4 font-bold">
            <h3 className="xs:text-xs ms:text-sm">
              {profile?.first_name} {""}
              {profile?.last_name}
            </h3>
            <p className="text-[#C5D86D] text-sm xs:text-xs ms:text-sm">
              {profile?.role}
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* <button
            onClick={toggleDropdown}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <FaUserCircle className="text-4xl text-primaryDark dark:text-lightText" />
            </div>
          </button>
          <ThemeToggle /> */}

        {/* Dropdown Menu (hidden by default) */}
        {/* {isDropdownOpen && (
          <ul className="absolute right-0 mt-5 z-10 menu menu-sm dropdown-content bg-gray-300 dark:bg-darkSurface rounded-box w-52 p-2 shadow-lg">
            <li className="hover:dark:bg-gray-800 hover:bg-slate-200  rounded-sm cursor-pointer p-2">
              <a className="justify-between text-primaryDark dark:text-lightText">
                Profile
                <span className="badge">New</span>
              </a>
            </li>

            <li className="hover:dark:bg-gray-800 hover:bg-slate-200 rounded-sm cursor-pointer p-2">
              <button
                onClick={toggleModal}
                className="text-primaryDark dark:text-lightText"
              >
                Logout
              </button>
            </li>
          </ul>
        )}*/}
      </div>

      {/* Fullscreen Logout Confirmation Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="modal-box bg-primaryLight dark:bg-darkSurface text-center p-10">
            <h3 className="font-bold text-lg text-primaryDark dark:text-lightText">
              Confirm Logout
            </h3>
            <p className="py-4 text-primaryDark dark:text-lightText">
              Are you sure you want to log out?
            </p>
            <div className="modal-action flex justify-center gap-4">
              <button
                className="btn bg-primaryDark dark:bg-lightText text-primaryDark"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="btn bg-primaryDark dark:bg-lightText text-primaryLight dark:text-darkSurface"
                onClick={toggleModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
