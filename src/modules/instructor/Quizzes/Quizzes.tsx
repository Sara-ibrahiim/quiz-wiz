import { BiSolidAlarmAdd } from "react-icons/bi";
import { RiSafe2Line } from "react-icons/ri";

export default function Quizzes() {
  return (
    <>
      <div className="w-100 flex gap-10 text-primaryDark dark:text-lightText p-5">
        <div className="flex justify-between px-3 w-5/12 gap-10 h-52">
          <div className="flex flex-1 flex-col gap-3 border-2 cursor-pointer p-3 dark:border-lightText border-primaryDark rounded-lg justify-center items-center  hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200">
            <div className="text-5xl">
              <BiSolidAlarmAdd />
            </div>
            <p className="font-bold text-2xl">Set up a new quiz</p>
          </div>
          <div className="flex flex-1 flex-col gap-3 border-2 cursor-pointer p-3 dark:border-lightText border-primaryDark rounded-lg justify-center items-center  hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200">
            <div className="text-5xl">
              <RiSafe2Line />
            </div>
            <p className="font-bold text-2xl">Question Bank</p>
          </div>
        </div>
        <div className="flex justify-between flex-col px-3 flex-1 gap-5">
          <div className="flex flex-1 flex-col gap-3 border-2 p-5 rounded-lg">
            <h1 className="self-start text-lg font-bold">Upcoming Quizzes</h1>
            <div></div>
          </div>
          <div className="flex flex-1 flex-col gap-3 border-2 cursor-pointer dark:border-lightText border-primaryDark rounded-lg justify-center items-center p-5 hover:bg-slate-800 transition duration-300 ">
            <div className="text-6xl ">
              <RiSafe2Line />
            </div>
            <p className="font-semibold text-lg">Question Bank</p>
          </div>
        </div>
      </div>
    </>
  );
}
