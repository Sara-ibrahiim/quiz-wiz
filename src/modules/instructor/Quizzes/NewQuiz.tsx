import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QUIZES_URLS, Groups_URls } from "@/constants/End-points";
import { FiCheck, FiX } from "react-icons/fi";

const NewQuiz = ({ onClose }: { onClose: () => void }) => {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    group: "",
    questions_number: 1,
    difficulty: "easy",
    type: "FE",
    schadule: "",
    duration: 60,
    score_per_question: 1,
  });

  const [groups, setGroups] = useState<{ _id: string; name: string }[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Fetch groups on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(Groups_URls.getGroupsList, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [accessToken]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(QUIZES_URLS.createNewQuiz, quizData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-primaryLight dark:bg-darkSurface p-8 rounded-xl shadow-lg w-[90%] max-w-2xl relative">
        {/* Save (checkmark) and Close (X) buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleSubmit}
            className="text-xl text-primaryDark dark:text-lightText"
          >
            <FiCheck />
          </button>
          <button
            onClick={onClose}
            className="text-xl text-primaryDark dark:text-lightText"
          >
            <FiX />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-primaryDark dark:text-lightText mb-5">
          Set up a new quiz
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
                required
              />
            </div>
          </div>

          {/* Duration, No. of Questions, Score per Question */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Duration (in minutes):
              </label>
              <select
                name="duration"
                value={quizData.duration}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                No. of questions:
              </label>
              <select
                name="questions_number"
                value={quizData.questions_number}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              >
                {[...Array(50)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Score per question:
              </label>
              <select
                name="score_per_question"
                value={quizData.score_per_question}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-primaryDark dark:text-lightText">
              Description:
            </label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
            />
          </div>

          {/* Schedule */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Schedule:
              </label>
              <input
                type="datetime-local"
                name="schadule"
                value={quizData.schadule}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
                required
              />
            </div>
          </div>

          {/* Group and Category Type */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Group name:
              </label>
              <select
                name="group"
                value={quizData.group}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
                required
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Category type:
              </label>
              <select
                name="type"
                value={quizData.type}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              >
                <option value="FE">FE</option>
                <option value="BE">BE</option>
                <option value="DO">DO</option>
              </select>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="font-semibold text-primaryDark dark:text-lightText">
                Difficulty level:
              </label>
              <select
                name="difficulty"
                value={quizData.difficulty}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuiz;
