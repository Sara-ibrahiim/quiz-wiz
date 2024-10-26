import { ResultDetailsForStudent } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ResultDetails() {
  const location = useLocation();
  const [resultDetails, setResultDetails] = useState<
    ResultDetailsForStudent[] | null
  >(null);

  useEffect(() => {
    setResultDetails(location.state.qus.participants);
  }, []);
  return (
    <>
      <div>
        <div className="p-4 w-2/4">
          <div className="border-2 rounded-md p-5 ">
            <h2 className="text-2xl font-bold text-primaryDark dark:text-accent">
              Results
            </h2>

            <table className="table-auto mt-5 border-separate border-spacing-y-2">
              <thead>
                <tr className="space-x-4">
                  <th className="w-[30rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300 rounded-tl-lg rounded-bl-md ">
                    Student name
                  </th>
                  <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300">
                    Quizz title
                  </th>
                  <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300">
                    Score
                  </th>
                  <th className="w-[30rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300 rounded-tr-lg rounded-br-md ">
                    Time submitted
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultDetails?.map((res) => {
                  return (
                    <tr key={res._id}>
                      <td className="p-2 border-2">
                        {res.participant.first_name}
                      </td>
                      <td className="p-2 border-2">{res.quiz.title}</td>
                      <td className="p-2 border-2">{res.score}</td>
                      <td className="p-2 border-2">
                        {new Date(res.finished_at).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
