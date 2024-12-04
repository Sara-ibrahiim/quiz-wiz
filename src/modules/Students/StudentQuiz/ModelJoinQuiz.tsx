import React, { useState } from "react";
import { BiSolidAlarmAdd } from "react-icons/bi";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useForm } from "react-hook-form";
import axios from "axios";
import { StudentQuiz_Url } from "@/constants/End-points";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ModelJoinQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  let {
    register,
    handleSubmit,
    reset,
    formState:{ errors },
  } = useForm();
  let onSubmit = async (data:any) => {
    try {
      let response = await axios.post(StudentQuiz_Url.joinQuiz, data, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      let quizIdStudent = response.data.data.quiz;
      navigate(`/dashboard/student-quiz/${quizIdStudent}`);
      toast.success("joined successfully");
      reset();
      //console.log(response.data.data.quiz);
    } catch (error: any) {
      toast.error(error.response.data.message || "Error");
    }
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50  ">
          <div className=" bg-lightText text-left rounded px-12 pt-12 dark:bg-primaryDark">
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <div className="flex flex-col px-3 pt-3  text-center">
                <h3 className="text-3xl mb-9 font-bold">Join Quiz</h3>
                <div>
                  <p className="mb-3 px-7 font-medium">
                    Input the code received for the quiz below to join
                  </p>
                </div>

                <div className="">
                  <div className="flex items-center border focus-within:border-[#c5d86d] focus-within:border-2 rounded-lg overflow-hidden mb-11">
                    <span className="bg-[#FFEDDF] b text-black  font-bold px-4 py-2">
                      Code
                    </span>

                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border-0 focus:outline-none dark:bg-transparent"
                      placeholder="Enter code here"
                      {...register("code", {
                        required: "Code is required",
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className=" flex justify-center  ">
                <button
                  className="btn  border rounded-tl mt-2 hover:text-[#c5d86d]"
                  type="submit"
                >
                  <ImCheckmark className="text-[1.5rem] m-5  " />
                </button>

                <button
                  className="  mt-2 rounded-tr border hover:text-[#c5d86d]"
                  onClick={toggleModal}
                  type="button"
                >
                  <ImCross className="text-[1.1rem] my-5 mx-6 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="">
        <div
          className="flex flex-col ms-12 gap-5 border-2 cursor-pointer p-10 dark:border-lightText border-primaryDark rounded-lg justify-center items-center hover:dark:bg-slate-800 transition duration-300 hover:bg-slate-200"
          onClick={toggleModal}
        >
          <div className="text-6xl">
            <BiSolidAlarmAdd />
          </div>
          <p className="font-bold text-xl">Join Quiz</p>
        </div>
      </div>
    </div>
  );
}
