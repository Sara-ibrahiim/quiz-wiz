import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FaSpinner, FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { QUIZES_URLS } from "@/constants/End-points";

const ViewQuiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quizDetails, setQuizDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken); // Get access token from Redux

  useEffect(() => {
    const fetchQuizDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(QUIZES_URLS.getQuizById(quizId), {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the auth token
          },
        });
        setQuizDetails(response.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId && accessToken) {
      fetchQuizDetails(); // Fetch quiz details if we have a quiz ID and access token
    }
  }, [quizId, accessToken]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-primaryDark dark:text-lightText" />
      </div>
    );
  }

  if (!quizDetails) {
    return <p>Quiz not found.</p>;
  }

  return (
    <div className="p-5 max-w-md ">
      {/* Breadcrumb Navigation */}
      <div className="text-sm mb-4 text-primaryDark dark:text-lightText">
        <Link to="/" className="text-primaryDark dark:text-lightText">
          Quizzes
        </Link>{" "}
        <span className="mx-2">&gt;</span> <span>{quizDetails.title}</span>
      </div>

      {/* Quiz Details */}
      <div className="border-2 p-5 rounded-lg bg-primaryLight dark:bg-darkSurface border-primaryDark dark:border-lightText">
        <h1 className="text-2xl font-bold text-primaryDark dark:text-lightText mb-3">
          {quizDetails.title}
        </h1>

        <div className="flex items-center text-sm text-primaryDark dark:text-lightText mb-3">
          <FaRegCalendarAlt className="mr-2" />
          {formatDate(quizDetails.schadule)}
          <FaClock className="ml-3 mr-2" />
          {quizDetails.duration} minutes
        </div>

        {/* Duration, Number of Questions, Score */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-secondaryLight dark:bg-primaryDark p-3 rounded-md">
            <span className="block font-semibold">Duration</span>
            <span>{quizDetails.duration} minutes</span>
          </div>

          <div className="bg-secondaryLight dark:bg-primaryDark p-3 rounded-md">
            <span className="block font-semibold">Number of questions</span>
            <span>{quizDetails.questions_number}</span>
          </div>

          <div className="bg-secondaryLight dark:bg-primaryDark p-3 rounded-md">
            <span className="block font-semibold">Score per question</span>
            <span>{quizDetails.score_per_question}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-secondaryLight dark:bg-primaryDark p-3 rounded-md mb-4">
          <span className="block font-semibold mb-2">Description</span>
          <p>{quizDetails.description || "No description available"}</p>
        </div>

        {/* Question Bank */}
        <div className="bg-secondaryLight dark:bg-primaryDark p-3 rounded-md mb-4">
          <span className="block font-semibold">Question bank used</span>
          <span>{quizDetails.bank_name || "N/A"}</span>
        </div>

        {/* Randomize Option */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={quizDetails.randomize || false}
            readOnly
            className="mr-2"
          />
          <span className="text-primaryDark dark:text-lightText">
            Randomize questions
          </span>
        </div>

        {/* Edit Button */}
        <div className="justify-end flex">
          <button className="bg-primaryDark text-primaryLight dark:text-primaryDark dark:bg-primaryLight px-4 py-2 rounded-md w-1/2  mt-4 flex items-center justify-center gap-2">
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuiz;
