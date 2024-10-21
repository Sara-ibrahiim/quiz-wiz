import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import QuizImage from "@/assets/quiz-img.png";
import { QUIZES_URLS } from "@/constants/End-points";
import { FaSpinner } from "react-icons/fa";
import Quiz from "@/utils/interfaces";

interface UpComingQuizzesProps {
  refreshTrigger?: boolean;
}

const UpComingQuizzes = ({ refreshTrigger }: UpComingQuizzesProps) => {
  const [incomingQuizzes, setIncomingQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { getIncoming5Quizes } = QUIZES_URLS;
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getIncoming5Quizes, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIncomingQuizzes(response.data);
    } catch (error) {
      console.error("Error Fetching quizzes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchQuizzes();
    }
  }, [accessToken, getIncoming5Quizes, refreshTrigger]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  // Handle navigating to the quiz detail page
  const handleViewQuiz = (quizId: string) => {
    navigate(`/dashboard/quizzes/${quizId}`);
  };

  return (
    <div className="flex flex-col gap-5 p-3 max-h-96 overflow-auto ">
      <h1 className="text-lg font-bold">Upcoming Quizzes</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-3xl text-primaryDark dark:text-lightText" />
        </div>
      ) : incomingQuizzes.length > 0 ? (
        incomingQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border-2 dark:border-lightText border-primaryDark special-border rounded-xl flex gap-5"
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
                {/* Add click event to open quiz detail page */}
                <p
                  className="flex items-center cursor-pointer"
                  onClick={() => handleViewQuiz(quiz._id)}
                >
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
