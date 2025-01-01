import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import { RootState } from "@/store/store";
import { BiSolidAlarmAdd } from "react-icons/bi";
const Navbar = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);

  return (
    <div className="navbar flex grid grid-cols-12 dark:bg-primaryDark text-primaryDark dark:text-lightText ps-1 border-b-[1px] border-[#ECECEC] pe-3">
      <div className="pt-5 xs:text-sm  md:col-span-7 sm:col-span-4 xs:col-span-3 text-primaryDark dark:text-lightText ms-3 font-bold mt-2 me-2">
        Dashboard
      </div>
      <div className="md:col-span-3 sm:col-span-4 xs:col-span-4  md:ms-3  md:ml-auto">
        <Link
          to={"/dashboard/quizzes"}
          className="flex md:mt-5 xs:mt-6 md:px-0 border-[1px] cursor-pointer md:ml-auto rounded-full md:pe-2 sm:mt-6 md:me-5 xs:w-11/12 sm:w-8/12 md:w-[200px] hover:bg-slate-300 transition duration-300 hover:dark:bg-slate-800"
        >
          <BiSolidAlarmAdd className=" md:ms-10 md:text-4xl xs:text-2xl  sm:text-3xl sm:ms-4" />
          {profile?.role === "Instructor" ? (
            <p className="mt-1 ms-2 font-bold md:text-lg xs:text-sm sm:text-base">
              New Quiz
            </p>
          ) : (
            <p className="mt-1 ms-2 font-bold md:text-lg xs:text-sm sm:text-base">
              Join Quiz
            </p>
          )}
        </Link>
      </div>
      <div className="md:relative md:col-span-2 sm:col-span-4 xs:col-span-3 xs:pt-3">
        <div className="flex"></div>

        {/* User Avatar Button */}

        <div className="flex items-center border-l-[1px] md:py-[15px] sm:py-[22px] xs:py-[7px] sm:pt-2  ">
          <div className="lg:mx-6 md:mx-3 xs:mx-2 sm:mx-4 font-bold">
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
      </div>
    </div>
  );
};

export default Navbar;
