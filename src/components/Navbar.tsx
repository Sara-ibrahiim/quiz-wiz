import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearAuth } from "../modules/auth/authSlice";
import AuthLogo from "./AuthLogo";
import ThemeToggle from "../modules/theme/ThemeToggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="navbar flex bg-gray-300 dark:bg-darkSurface text-primaryDark dark:text-lightText py-5 px-1">
      <div className="flex-1">
        <AuthLogo />
      </div>

      <div className="relative">
        {/* User Avatar Button */}
        <div className="flex items-center">
          <button
            onClick={toggleDropdown}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <FaUserCircle className="text-4xl text-primaryDark dark:text-lightText" />
            </div>
          </button>
          <ThemeToggle />
        </div>

        {/* Dropdown Menu (hidden by default) */}
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-5 z-10 menu menu-sm dropdown-content bg-gray-300 dark:bg-darkSurface rounded-box w-52 p-2 shadow-lg">
            <li className="hover:dark:bg-gray-800 hover:bg-slate-200  rounded-sm cursor-pointer p-2">
              <a className="justify-between text-primaryDark dark:text-lightText">
                Profile
                <span className="badge">New</span>
              </a>
            </li>

            <li
              className="hover:dark:bg-gray-800 hover:bg-slate-200 rounded-sm cursor-pointer p-2"
              onClick={toggleModal}
            >
              <a className="text-primaryDark dark:text-lightText">Logout</a>
            </li>
          </ul>
        )}
      </div>

      {/* Fullscreen Logout Confirmation Modal */}
      {isModalOpen && (
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
      )}
    </div>
  );
};

export default Navbar;
