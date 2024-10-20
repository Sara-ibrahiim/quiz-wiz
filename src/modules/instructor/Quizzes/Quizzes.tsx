import { BiSolidAlarmAdd } from "react-icons/bi";
import { RiSafe2Line } from "react-icons/ri";
import UpComingQuizzes from "./UpComingQuizzes";

export default function Quizzes() {
  return (
    <>
      <div className="w-100 flex gap-10 text-primaryDark dark:text-lightText p-5 relative">
        <div className="flex justify-between px-3 w-5/12 gap-10 h-52">
          <div className="flex flex-1 flex-col gap-3 border-2 cursor-pointer p-3 dark:border-lightText border-primaryDark rounded-lg justify-center items-center  hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200">
            <div className="text-6xl">
              <BiSolidAlarmAdd />
            </div>
            <p className="font-bold text-xl">Set up a new quiz</p>
          </div>
          <div className="flex flex-1 flex-col gap-3 border-2 cursor-pointer p-3 dark:border-lightText border-primaryDark rounded-lg justify-center items-center  hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200">
            <div className="text-6xl">
              <RiSafe2Line />
            </div>
            <p className="font-bold text-xl">Question Bank</p>
          </div>
        </div>
        <div className="flex justify-between flex-col  flex-1 gap-5 border-2 rounded-lg dark:border-lightText border-primaryDark">
          <UpComingQuizzes />
        </div>
      </div>
    </>
  );
}
