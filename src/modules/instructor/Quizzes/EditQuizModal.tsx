import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FaCalendarAlt } from "react-icons/fa";
import { QUIZES_URLS, Groups_URls } from "@/constants/End-points";

interface EditQuizModalProps {
  quizId: string; // ID of the quiz to edit
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void; // Close modal handler
  refreshQuizzes: () => void; // Function to refresh the quiz list
}

const EditQuizModal = ({
  quizId,
  isOpen,
  onClose,
  refreshQuizzes,
}: EditQuizModalProps) => {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    group: "",
    schadule: "",
    duration: 30,
    score_per_question: 1,
  });
  const [groups, setGroups] = useState<{ _id: string; name: string }[]>([]); // To store the list of groups
  const accessToken = useSelector((state: RootState) => state.auth.accessToken); // Auth token

  // Fetch the quiz details and groups when the modal is opened
  useEffect(() => {
    if (isOpen && quizId) {
      // Fetch quiz details
      axios
        .get(QUIZES_URLS.getQuizById(quizId), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // Set only the editable fields in state
          const {
            title,
            description,
            group,
            schadule,
            duration,
            score_per_question,
          } = response.data;
          setQuizData({
            title,
            description,
            group,
            schadule,
            duration,
            score_per_question,
          });
        })
        .catch((error) => console.error("Error fetching quiz details:", error));

      // Fetch groups
      axios
        .get(Groups_URls.getGroupsList, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => setGroups(response.data))
        .catch((error) => console.error("Error fetching groups:", error));
    }
  }, [isOpen, quizId, accessToken]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Handle form submission to update the quiz
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new object with only the editable fields
    const updatedQuizData = {
      title: quizData.title,
      description: quizData.description,
      group: quizData.group,
      schadule: quizData.schadule,
      duration: quizData.duration,
      score_per_question: quizData.score_per_question,
    };

    try {
      await axios.put(QUIZES_URLS.updateQuizById(quizId), updatedQuizData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      refreshQuizzes(); // Refresh quiz list after updating
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  // Render nothing if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-primaryLight dark:bg-darkSurface p-8 rounded-xl shadow-lg w-[90%] max-w-5xl relative">
        {/* Save (checkmark) and Close (X) buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleSubmit}
            className="text-xl text-primaryDark dark:text-lightText"
          >
            ✔
          </button>
          <button
            onClick={onClose}
            className="text-xl text-primaryDark dark:text-lightText"
          >
            ✖
          </button>
        </div>

        <h2 className="text-2xl font-bold text-primaryDark dark:text-lightText mb-5">
          Edit Quiz: {quizData.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
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

          {/* Group */}
          <div className="flex-1">
            <label className="font-semibold text-primaryDark dark:text-lightText">
              Group:
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

          {/* Schedule */}
          <div className="relative">
            <div className="flex items-center">
              <input
                type="datetime-local"
                name="schadule"
                value={quizData.schadule}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              />
              <FaCalendarAlt className="absolute left-3 text-primaryDark dark:text-lightText" />
            </div>
          </div>

          {/* Duration */}
          <div className="flex-1">
            <label className="font-semibold text-primaryDark dark:text-lightText">
              Duration:
            </label>
            <input
              type="number"
              name="duration"
              value={quizData.duration}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              required
            />
          </div>

          {/* Score per Question */}
          <div className="flex-1">
            <label className="font-semibold text-primaryDark dark:text-lightText">
              Score per question:
            </label>
            <input
              type="number"
              name="score_per_question"
              value={quizData.score_per_question}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md border-2 dark:bg-darkSurface dark:border-borderColor dark:text-lightText"
              required
            />
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
        </form>
      </div>
    </div>
  );
};

export default EditQuizModal;
