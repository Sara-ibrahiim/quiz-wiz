import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QUIZES_URLS } from "@/constants/End-points";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CompletedQuiz {
  quiz: {
    _id: string;
    title: string;
    participants?: any[];
    schadule: string;
  };
}

const CompletedQuizzes = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState<CompletedQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(QUIZES_URLS.getCompleted, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Set the completed quizzes from response
        setCompletedQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching completed quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchCompletedQuizzes();
    }
  }, [accessToken]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-primaryDark dark:text-lightText" />
      </div>
    );
  }

  return (
    <div className="p-5 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Completed Quizzes</h1>
        <Link to={"/dashboard/results"}>
          <div className="text-green-500 flex items-center">
            Results <span className="ml-2 text-lg">➡️</span>
          </div>
        </Link>
      </div>

      <table className="min-w-full border border-primaryDark dark:border-lightText rounded-md overflow-hidden">
        <thead>
          <tr className="bg-primaryDark text-primaryLight dark:bg-darkBackground rounded dark:text-lightText">
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Group name</th>
            <th className="py-2 px-4 text-left">No. of people attended</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {completedQuizzes.map((quizData, index) => (
            <tr
              key={quizData.quiz._id}
              className="border-t dark:border-lightText text-primaryDark dark:text-lightText"
            >
              <td className="py-2 px-4">{quizData.quiz.title}</td>
              {/* Assign dynamic group names like Group 1, Group 2, etc. */}
              <td className="py-2 px-4">{`Group ${index + 1}`}</td>
              {/* Check if participants is defined and fallback to 0 if it's undefined */}
              <td className="py-2 px-4">
                {quizData.quiz.participants
                  ? quizData.quiz.participants.length
                  : 0}{" "}
                persons
              </td>
              <td className="py-2 px-4">
                {formatDate(quizData.quiz.schadule)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedQuizzes;
