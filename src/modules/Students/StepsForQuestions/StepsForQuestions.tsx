import LoadingPencil from "@/components/LoadingPencil/LoadingPencil";
import { StudentQuiz_Url } from "@/constants/End-points";
import { StudentQuestions } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QuizCompletionModa from "../QuizCompletionModa/QuizCompletionModa";

export default function StepsForQuestions() {
  const { quizIdStudent } = useParams<{ quizIdStudent: string }>();
  const [getQuestions, setGetQuestions] = useState<StudentQuestions[]>([]);
  const [lengthOfArray, setLengthOfArray] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [anArrayOfAnswers, setAnArrayOfAnswers] = useState<
    Map<string, string>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});

  const getQuizById = async (quizIdStudent: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        StudentQuiz_Url.getQuizWithoutAnswer(quizIdStudent),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const questions = response.data.data.questions;
      console.log(response.data.data);
      setGetQuestions(questions);

      // Create array of Maps for each question's answers
      const answerMaps = questions.map(
        (q: StudentQuestions) => new Map(Object.entries(q.options))
      );

      setAnArrayOfAnswers(answerMaps);

      setLengthOfArray(
        Array(questions.length)
          .fill(0)
          .map((_, i) => i + 1)
      );
    } catch (error: any) {
      toast.error(
        error.response.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizIdStudent) {
      getQuizById(quizIdStudent);
    }
  }, [quizIdStudent]);

  const handleComplete = () => {
    setIsModalOpen(true);
  };

  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };

  return (
    <>
      {loading ? (
        <LoadingPencil />
      ) : (
        <>
          {isModalOpen && (
            <QuizCompletionModa setIsModalOpen={setIsModalOpen} />
          )}
          <FormWizard onComplete={handleComplete} onTabChange={tabChanged}>
            {lengthOfArray.map((num, idx) => {
              const question = getQuestions[num - 1];
              const optionsMap = anArrayOfAnswers[idx];

              return (
                <FormWizard.TabContent key={num}>
                  <div className="flex items-center justify-between gap-5 mx-5">
                    <h3 className="w-full py-2 font-bold text-center text-white bg-red-500 rounded-md text-md xl:text-xl lg:text-lg">
                      {question?.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-2 mt-5 text-lg font-bold tracking-wider md:grid-cols-2">
                    {["A", "B", "C", "D"].map((answer) => (
                      <div
                        key={answer}
                        className={`flex font-bold text-black border-4 py-2 rounded-full px-5 items-center hover:bg-emerald-400 group duration-500 transition-all inputWrapper ${
                          selectedAnswers[num] === answer
                            ? "bg-emerald-400 group inputWrapper"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [num]: answer,
                          }))
                        }
                      >
                        <div className="size-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char dark:text-white">
                          {answer}
                        </div>
                        <input
                          type="radio"
                          id={`option${answer}`}
                          name={`question-${num}`}
                          className="hidden"
                          value={answer}
                        />
                        <span className="text-[12px] md:text-[15px] text-center m-auto dark:text-white">
                          {optionsMap?.get(answer) || "No answer text"}
                        </span>
                      </div>
                    ))}
                  </div>
                </FormWizard.TabContent>
              );
            })}
          </FormWizard>
        </>
      )}

      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </>
  );
}
