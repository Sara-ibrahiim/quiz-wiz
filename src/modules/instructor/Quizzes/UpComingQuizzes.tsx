import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import QuizImage from "@/assets/quiz-img.png"; // Imported quiz image
import { QUIZES_URLS } from "@/constants/End-points";
import Quiz from "@/utils/interfaces";

const UpComingQuizzes = () => {
  const [incomingQuizzes, setIncomingQuizzes] = useState<Quiz[]>([]);
  const { getIncoming5Quizes } = QUIZES_URLS;
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(getIncoming5Quizes, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIncomingQuizzes(response.data);
      } catch (error) {
        console.error("Error Fetching quizzes", error);
      }
    };
    if (accessToken) {
      fetchQuizzes();
    }
  }, [accessToken, getIncoming5Quizes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Return a fallback string for invalid dates
    }
    // Return formatted date and time
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="flex flex-col gap-5 p-3">
      <h1 className="text-lg font-bold">Upcoming Quizzes</h1>
      {incomingQuizzes.length > 0 ? (
        incomingQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border-2  dark:border-lightText border-primaryDark special-border rounded-xl flex gap-5"
          >
            <div>
              <img src={QuizImage} alt="Quiz" className="w-36 h-36" />
            </div>
            <div className="flex-col flex flex-1 gap-5 justify-center">
              <div>
                <h2 className="text-2xl font-bold">{quiz.title}</h2>
                <p>{formatDate(quiz.schadule)}</p>
              </div>
              <div className="flex justify-between">
                <p>No. of students enrolled: {quiz.participants}</p>
                <p className=" flex items-center">
                  Open <span className="pr-5 pl-1 text-green-500">➡️</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No upcoming quizzes found.</p>
      )}
    </div>
  );
};

export default UpComingQuizzes;
