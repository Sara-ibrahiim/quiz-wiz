import { useNavigate } from "react-router-dom";

export default function QuizCompletionModa({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-lightText rounded-lg shadow-lg p-8 w-[90%] max-w-md dark:bg-primaryDark">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
           <span className="text-customGreen"> Great Job!</span> <br /> You've Completed the Quiz!
          </h3>

          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Thank you for answering all the questions.
          </p>

          <button
            onClick={() => {
                setIsModalOpen(false);
                navigate("/dashboard/results")
            }}
            className="px-6 py-3 text-sm font-medium text-white bg-customGreen rounded-lg hover:bg-customGreen transition duration-200"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
