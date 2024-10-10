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
      console.log(res);
      toast.success("Question deleted successfully");
      setAllQuestions((prev) => prev?.filter((q) => q._id !== id) || []);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="border-2 bordColor rounded-md p-5 ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Bank Of Questions</h2>
            <button
              className="flex items-center border-2 bordColor rounded-full px-2 py-1"
              onClick={() => {
                setModalOpen(true);
                setTile("Set up a new question");
                setFireedFunction(() => getAllQuestions);
              }}
            >
              <FaPlusCircle />
              <span className="ps-2">Add Question</span>
            </button>
          </div>

          <table className="table-auto mt-5 border-separate border-spacing-y-2">
            <thead>
              <tr className="space-x-4">
                <th className="w-[30rem] bg-primaryDark text-lightText font-semibold p-1 text-left border-r-2 border-gray-300 rounded-tl-lg rounded-bl-md ">
                  Question Title
                </th>
                <th className="w-[20rem] bg-primaryDark text-lightText font-semibold p-1 text-left border-r-2 border-gray-300">
                  Question Desc
                </th>
                <th className="w-[30rem] bg-primaryDark text-lightText font-semibold p-1 text-left border-r-2 border-gray-300">
                  Question difficulty level
                </th>
                <th className="w-[20rem] bg-primaryDark text-lightText font-semibold p-1 text-left border-r-2 border-gray-300">
                  Date
                </th>
                <th className="w-[20rem] bg-primaryDark text-lightText font-semibold p-1 text-left border-r-2 border-gray-300 rounded-tr-md rounded-br-md">
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
                        onClick={() => setModalOpen(true)}
                        className="cursor-pointer"
                      />
                      <FaEdit
                        onClick={() => {
                          setSelectedQuestion(qus);
                          setTile("Update question");
                          setModalOpen(true);
                          setFireedFunction(() => getAllQuestions);
                        }}
                        className="cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => {
                          setModalOpen(true);
                          setTile("Delete Question");
                          setSelectedQuestion(qus);
                          setFireedFunction(() => deleteQuestion);
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
            selectedQuestion={selectedQuestion}
            fireFunc={fireedFunction}
          ></PopupModal>
        </div>
      </div>
    </div>
  );
}

const PopupModal = ({ isOpen, onClose, title, selectedQuestion, fireFunc }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen && title === "Update question" && selectedQuestion) {
      reset({
        title: selectedQuestion.title,
        description: selectedQuestion.description,
        answerA: selectedQuestion.options.A,
        answerB: selectedQuestion.options.B,
        answerC: selectedQuestion.options.C,
        answerD: selectedQuestion.options.D,
        answer: selectedQuestion.answer,
        type: selectedQuestion.type,
      });
    }
  }, [isOpen, title, selectedQuestion, reset]);

  let onSubmit;

  if (title == "Set up a new question") {
    onSubmit = async (data) => {
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

        const res = await axios.post(`${Question_URls.create}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(res);
        fireFunc();
        toast.success("Question added successfully");
        onClose();
      } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
    };
  } else if (title == "Update question") {
    onSubmit = async (data) => {
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

        const res = await axios.post(`${Question_URls.create}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(res);
        fireFunc();
        toast.success("Question updated successfully");
        onClose();
      } catch (error) {
        console.log(error);
      }
    };
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4 border-b-2 bordColor">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div>
            {title == "Delete Question" ? (
              <button
                onClick={() => {
                  fireFunc(selectedQuestion._id);
                  onClose();
                }}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            ) : title == "Set up a new question" ? (
              <button
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            ) : title == "Update question" ? (
              <button
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                }}
                className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
              >
                <IoCheckmark />
              </button>
            )}

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 px-2 text-3xl font-bold "
            >
              <IoIosClose />
            </button>
          </div>
        </div>
        <div>
          {title == "Delete Question" ? (
            <>
              <p className="text-center text-1xl font-bold mb-3">
                Are you sure you want to delete this item?
              </p>
              <img
                src={deleteImage}
                alt="delete"
                className="w-80 mx-auto rounded-md"
              />
            </>
          ) : title == "Set up a new question" ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <p className="mb-4 text-lg font-semibold">Details</p>

                <div className="flex items-center mb-4 w-full">
                  <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                    Title:
                  </span>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="flex items-center mb-4 w-full">
                  <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                    Description:
                  </span>
                  <input
                    type="text"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center w-1/2 pr-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      a:
                    </span>
                    <input
                      type="text"
                      {...register("answerA", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerA && (
                      <p className="text-red-500">{errors.answerA.message}</p>
                    )}
                  </div>
                  <div className="flex items-center w-1/2 pl-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      b:
                    </span>
                    <input
                      type="text"
                      {...register("answerB", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerB && (
                      <p className="text-red-500">{errors.answerB.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center w-1/2 pr-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      c:
                    </span>
                    <input
                      type="text"
                      {...register("answerC", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerC && (
                      <p className="text-red-500">{errors.answerC.message}</p>
                    )}
                  </div>

                  <div className="flex items-center w-1/2 pl-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      d:
                    </span>
                    <input
                      type="text"
                      {...register("answerD", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerD && (
                      <p className="text-red-500">{errors.answerD.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center pr-2 w-1/2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md whitespace-nowrap">
                      Right Answer
                    </span>
                    <input
                      type="text"
                      {...register("answer", {
                        required: "required",
                      })}
                      className="p-2 border border-gray-300 rounded-r-md w-20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answer && (
                      <p className="text-red-500">{errors.answer.message}</p>
                    )}
                  </div>

                  <div className="flex items-center pl-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md whitespace-nowrap">
                      Category Type
                    </span>
                    <select
                      {...register("type", {
                        required: "required",
                      })}
                      className="p-2 border border-gray-300 rounded-r-md w-20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="BE">BE</option>
                      <option value="FE">FE</option>
                      <option value="DO">DO</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500">{errors.type.message}</p>
                    )}
                  </div>
                </div>
              </form>
            </>
          ) : title == "Update question" ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <p className="mb-4 text-lg font-semibold">Details</p>

                <div className="flex items-center mb-4 w-full">
                  <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                    Title:
                  </span>
                  <input
                    type="text"
                    defaultValue={selectedQuestion.title}
                    {...register("title", { required: "Title is required" })}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="flex items-center mb-4 w-full">
                  <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                    Description:
                  </span>
                  <input
                    type="text"
                    defaultValue={selectedQuestion.description}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center w-1/2 pr-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      a:
                    </span>
                    <input
                      type="text"
                      defaultValue={selectedQuestion.options.A}
                      {...register("answerA", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerA && (
                      <p className="text-red-500">{errors.answerA.message}</p>
                    )}
                  </div>
                  <div className="flex items-center w-1/2 pl-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      b:
                    </span>
                    <input
                      type="text"
                      defaultValue={selectedQuestion.options.B}
                      {...register("answerB", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerB && (
                      <p className="text-red-500">{errors.answerB.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center w-1/2 pr-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      c:
                    </span>
                    <input
                      type="text"
                      defaultValue={selectedQuestion.options.C}
                      {...register("answerC", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerC && (
                      <p className="text-red-500">{errors.answerC.message}</p>
                    )}
                  </div>

                  <div className="flex items-center w-1/2 pl-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md">
                      d:
                    </span>
                    <input
                      type="text"
                      defaultValue={selectedQuestion.options.D}
                      {...register("answerD", {
                        required: "required",
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answerD && (
                      <p className="text-red-500">{errors.answerD.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="flex items-center pr-2 w-1/2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md whitespace-nowrap">
                      Right Answer
                    </span>
                    <input
                      type="text"
                      defaultValue={selectedQuestion.answer}
                      {...register("answer", {
                        required: "required",
                      })}
                      className="p-2 border border-gray-300 rounded-r-md w-20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.answer && (
                      <p className="text-red-500">{errors.answer.message}</p>
                    )}
                  </div>

                  <div className="flex items-center pl-2">
                    <span className="bg-secondaryLight text-white px-3 py-2 rounded-l-md whitespace-nowrap">
                      Category Type
                    </span>
                    <select
                      {...register("type", {
                        required: "required",
                      })}
                      className="p-2 border border-gray-300 rounded-r-md w-20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      defaultValue={selectedQuestion.type}
                    >
                      <option value="BE">BE</option>
                      <option value="FE">FE</option>
                      <option value="DO">DO</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500">{errors.type.message}</p>
                    )}
                  </div>
                </div>
              </form>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
