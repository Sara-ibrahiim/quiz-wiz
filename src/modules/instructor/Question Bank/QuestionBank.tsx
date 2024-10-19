import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { QuestionFrom, CreateQuestionFrom } from "../../../utils/interfaces";
import { Question_URls } from "../../../constants/End-points";
import { IoCheckmark } from "react-icons/io5";
import deleteImage from "../../../assets/pexels-cup-of-couple-6632867.jpg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function QuestionBank() {
  const [fireedFunction, setFireedFunction] = useState<any>(null);
  const [title, setTile] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<null | QuestionFrom[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionFrom | null>(
    null
  );

  const deleteQuestion = async (id: string) => {
    try {
      const res = await axios.delete(`${Question_URls.delete(id)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Question deleted successfully");
      setAllQuestions((prev) => prev?.filter((q) => q._id !== id) || []);
      setModalOpen(false);
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const getAllQuestions = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("profile"))._id;
      const res = await axios.get(`${Question_URls.getAll}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const filterdArray = res.data.filter((item: QuestionFrom) => {
        return item.instructor == userId;
      });
      setAllQuestions(filterdArray);
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="border-2 rounded-md p-5 ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primaryDark dark:text-accent">
              Bank Of Questions
            </h2>
            <button
              className="flex items-center border-2 rounded-full px-2 py-1"
              onClick={() => {
                setModalOpen(true);
                setTile("Set up a new question");
                setFireedFunction(() => getAllQuestions);
                setSelectedQuestion(null);
              }}
            >
              <FaPlusCircle />
              <span className="ps-2">Add Question</span>
            </button>
          </div>

          <table className="table-auto mt-5 border-separate border-spacing-y-2">
            <thead>
              <tr className="space-x-4">
                <th className="w-[30rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-1 text-left border-r-2 border-gray-300 rounded-tl-lg rounded-bl-md ">
                  Question Title
                </th>
                <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-1 text-left border-r-2 border-gray-300">
                  Question Desc
                </th>
                <th className="w-[30rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-1 text-left border-r-2 border-gray-300">
                  Question difficulty level
                </th>
                <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-1 text-left border-r-2 border-gray-300">
                  Date
                </th>
                <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-1 text-left border-r-2 border-gray-300 rounded-tr-md rounded-br-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allQuestions?.map((qus) => {
                return (
                  <tr key={qus._id} className="">
                    <td className="p-2 border-2">{qus.title}</td>
                    <td className="p-2 border-2">{qus.description}</td>
                    <td className="p-2 border-2">{qus.difficulty}</td>
                    <td className="p-2 border-2">Date</td>
                    <td className="p-3 border-2 flex justify-evenly">
                      <FaEye
                        onClick={() => {
                          setTile("Display question");
                          setModalOpen(true);
                        }}
                        className="cursor-pointer"
                      />
                      <FaEdit
                        onClick={() => {
                          setTile("Update question");
                          setModalOpen(true);
                          setSelectedQuestion(qus);
                        }}
                        className="cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => {
                          setModalOpen(true);
                          setTile("Delete Question");
                          setFireedFunction(() => deleteQuestion);
                          setSelectedQuestion(qus);
                        }}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <PopupModal
            isOpen={isModalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            title={title}
            fireFunction={fireedFunction}
            selectedQuestion={selectedQuestion}
          ></PopupModal>
        </div>
      </div>
    </div>
  );
}

const PopupModal = ({
  isOpen,
  onClose,
  title,
  fireFunction,
  selectedQuestion,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (title == "Set up a new question") {
      try {
        data.options = {
          A: data.answerA,
          B: data.answerB,
          C: data.answerC,
          D: data.answerD,
        };
        delete data.answerA;
        delete data.answerB;
        delete data.answerC;
        delete data.answerD;

        await axios.post(`${Question_URls.create}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        toast.success("Question added successfully");
        reset();
        onClose();
        fireFunction();
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    } else if (title == "Update question") {
      try {
        await axios.put(
          `${Question_URls.update(selectedQuestion._id)}`,
          { answer: data.answer },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        toast.success("Question Updated successfully");
        onClose();
        // fireFunction();
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full ">
        <div className="flex justify-between items-center mb-4 border-b-2 bordColor">
          <h3 className="text-lg font-semibold text-primaryDark dark:text-accent">
            {title}
          </h3>

          {/* The Button to call the right function */}
          <div>
            {title == "Delete Question" ? (
              <button
                onClick={() => {
                  fireFunction(selectedQuestion._id);
                }}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            ) : title == "Set up a new question" ? (
              <button
                onClick={handleSubmit(onSubmit)}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            ) : title == "Update question" ? (
              <button
                onClick={handleSubmit(onSubmit)}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log("2y 2bn klb");
                }}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                reset();
              }}
              className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
            >
              <IoIosClose />
            </button>
          </div>
        </div>

        {/* The Body of the pop-up */}
        <div>
          {title == "Delete Question" ? (
            <>
              <p className="text-center text-1xl font-bold mb-3 text-primaryDark dark:text-accent">
                Are you sure you want to delete this item?
              </p>
              <img
                src={deleteImage}
                alt="delete"
                className="w-80 mx-auto rounded-md"
              />
            </>
          ) : title == "Set up a new question" || title == "Update question" ? (
            <>
              <form className="p-4 ">
                <p className="mb-4 text-lg font-semibold text-primaryDark dark:text-accent">
                  Details
                </p>

                <div className="flex items-center mb-4 w-full">
                  <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md">
                    Title:
                  </span>
                  <input
                    type="text"
                    defaultValue={
                      selectedQuestion ? selectedQuestion.title : ""
                    }
                    readOnly={selectedQuestion ? true : false}
                    {...register("title")}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark "
                  />
                </div>

                <div className="flex items-center mb-4 w-full">
                  <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md">
                    Description:
                  </span>
                  <input
                    type="text"
                    readOnly={selectedQuestion ? true : false}
                    defaultValue={
                      selectedQuestion ? selectedQuestion.description : ""
                    }
                    {...register("description")}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                  />
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center w-1/2 pr-2">
                    <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md">
                      a:
                    </span>
                    <input
                      type="text"
                      readOnly={selectedQuestion ? true : false}
                      defaultValue={
                        selectedQuestion ? selectedQuestion.options.A : ""
                      }
                      {...register("answerA")}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                    />
                  </div>

                  <div className="flex items-center w-1/2 pl-2">
                    <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md">
                      b:
                    </span>
                    <input
                      type="text"
                      readOnly={selectedQuestion ? true : false}
                      defaultValue={
                        selectedQuestion ? selectedQuestion.options.B : ""
                      }
                      {...register("answerB")}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                    />
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center w-1/2 pr-2">
                    <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md">
                      c:
                    </span>
                    <input
                      type="text"
                      readOnly={selectedQuestion ? true : false}
                      defaultValue={
                        selectedQuestion ? selectedQuestion.options.C : ""
                      }
                      {...register("answerC")}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                    />
                  </div>

                  <div className="flex items-center w-1/2 pl-2">
                    <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md">
                      d:
                    </span>
                    <input
                      type="text"
                      readOnly={selectedQuestion ? true : false}
                      defaultValue={
                        selectedQuestion ? selectedQuestion.options.D : ""
                      }
                      {...register("answerD")}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                    />
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center pr-2 w-1/2">
                    <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md whitespace-nowrap">
                      Right Answer
                    </span>
                    <input
                      type="text"
                      defaultValue={
                        selectedQuestion ? selectedQuestion.answer : ""
                      }
                      {...register("answer", {
                        required: "This field is required",
                        validate: (value) => {
                          const validValues = ["a", "b", "c", "d"];
                          return (
                            validValues.includes(value) ||
                            "Value must be a, b, c, or d"
                          );
                        },
                      })}
                      className="p-2 border border-gray-300 rounded-r-md w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                    />
                    {errors.answer && (
                      <p className="text-red-500">
                        {errors.answer.message as string}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center pl-2">
                    <span className="bg-secondaryLight dark:bg-gray-700  text-primaryDark dark:text-accent font-bold px-3 py-2 rounded-l-md whitespace-nowrap">
                      Category Type
                    </span>
                    <select
                      disabled={selectedQuestion ? true : false}
                      {...register("type")}
                      defaultValue={
                        selectedQuestion ? selectedQuestion.type : ""
                      }
                      className="p-2 border border-gray-300 rounded-r-md w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-primaryDark"
                    >
                      <option value="BE">BE</option>
                      <option value="FE">FE</option>
                      <option value="DO">DO</option>
                    </select>
                  </div>
                </div>
              </form>
            </>
          ) : (
            "any"
          )}
        </div>
      </div>
    </div>
  );
};
