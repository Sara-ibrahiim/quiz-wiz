import { useState } from "react";
import { BiSolidAlarmAdd } from "react-icons/bi";
import { RiSafe2Line } from "react-icons/ri";
import UpComingQuizzes from "./UpComingQuizzes";
import NewQuiz from "./NewQuiz"; // Import the NewQuiz modal
import { Link } from "react-router-dom";
import { QUIZES_URLS } from "@/constants/End-points";
import CompletedQuizzes from "./CompletedQuizzes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ModelJoinQuiz from "@/modules/Students/StudentQuiz/ModelJoinQuiz";

export default function Quizzes() {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger refresh
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleQuizAdded = () => {
    setRefreshTrigger((prev) => !prev); // Toggle refreshTrigger to re-fetch quizzes
    handleCloseModal(); // Close the modal
  };

  return (
    <>
      <div className="w-100 flex grid  sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-12   gap-10 text-primaryDark dark:text-lightText p-5 relative xs:flex-col sm:flex-col md:flex-row">
        <div
          className=" px-3 md:col-span-5   gap-10 h-52  "
          style={
            profile?.role === "Student"
              ? { display: "flex", justifyContent: "center", width: "100%" }
              : {
                  display: "flex",
                  justifyContent: "space-between",
                }
          }
        >
          {profile?.role === "Instructor" ? (
            <div
              className="flex flex-1 flex-col gap-3 border-2 cursor-pointer p-3 dark:border-lightText border-primaryDark rounded-lg justify-center items-center hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200"
              onClick={handleOpenModal}
            >
              <div className="text-6xl">
                <BiSolidAlarmAdd />
              </div>
              <p className="font-bold text-xl">Set up a new quiz</p>
            </div>
          ) : (
            <ModelJoinQuiz />
          )}

          { profile?.role === "Instructor" &&    <Link
            to={"/dashboard/question-bank"}
   
            className=" xs:mb-12 sm:mb-12 md:mb-0  flex flex-1 flex-col gap-3 border-2 cursor-pointer p-3 dark:border-lightText border-primaryDark rounded-lg justify-center items-center hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200"
          >
            <div className="text-6xl ">
              <RiSafe2Line />
            </div>
            <p className="font-bold text-xl">Question Bank</p>
          </Link>}
        
        </div>

        {/* flex justify-between flex-col flex-1 */}
        <div
          className=" gap-5 md:col-span-7  "
          style={
            profile?.role === "Student"
              ? { width: "100%" }
              : {
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  flex: "1",
                }
          }
        >
          {/* {profile?.role === "Instructor" && ( */}
          <div className=" border-2 rounded-lg dark:border-lightText border-primaryDark mb-3  xs:mt-12 sm:mt-12 md:mt-0">
            <div className="flex flex-col gap-5 p-2 max-h-[500px] overflow-auto">
              <UpComingQuizzes
                api={QUIZES_URLS.getAllQuizes}
                refreshTrigger={refreshTrigger}
              />{" "}
            </div>
          </div>
          {/* ) } */}

          <div className="border-2 rounded-lg dark:border-lightText border-primaryDark">
            <div className="p-2 max-h-[300px] overflow-auto">
              <CompletedQuizzes />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <NewQuiz onClose={handleQuizAdded} />}{" "}
      {/* Pass handleQuizAdded */}
    </>
  );
}
