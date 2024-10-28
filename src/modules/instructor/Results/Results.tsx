import { Groups_URls, Results_URls } from "@/constants/End-points";
import { GroupFromResult, Result } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const Navigate = useNavigate();
  const [allResults, setAllResults] = useState<Result[]>([]);
  const [groupList, setGroupList] = useState<GroupFromResult[]>([]);

  const getAllResults = async () => {
    try {
      const res = await axios.get(`${Results_URls.getAllResults}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(res.data);
      setAllResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupList = async () => {
    try {
      const res = await axios.get(`${Groups_URls.getGroupsList}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setGroupList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllResults();
    getGroupList();
  }, []);

  return (
    <>
      <div>
        <div className="p-4">
          <div className="border-2 rounded-md p-5 ">
            <h2 className="text-2xl font-bold text-primaryDark dark:text-accent">
              Completed Quizzes
            </h2>

            <table className="table-auto mt-5 border-separate border-spacing-y-2">
              <thead>
                <tr className="space-x-4">
                  <th className="w-[30rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300 rounded-tl-lg rounded-bl-md ">
                    Title
                  </th>
                  <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300">
                    Group name
                  </th>
                  <th className="w-[30rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300">
                    No. of persons in group
                  </th>
                  <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300">
                    Participants
                  </th>
                  <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300">
                    Date
                  </th>
                  <th className="w-[20rem] bg-primaryDark text-white dark:bg-primaryLight dark:text-primaryDark font-semibold p-2 text-left border-r-2 border-gray-300 rounded-tr-md rounded-br-md">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allResults.map((res) => {
                  const group = groupList.find((g) => g._id === res.quiz.group);
                  const groupName = group ? group.name : "Group Not Found";

                  return (
                    <tr key={res.quiz._id}>
                      <td className="p-2 border-2">{res.quiz.title}</td>
                      <td className="p-2 border-2">{groupName}</td>
                      <td className="p-2 border-2">
                        {group?.students.length || "0"}
                      </td>
                      <td className="p-2 border-2">
                        {res.participants.length}
                      </td>
                      <td className="p-2 border-2">
                        {new Date(res.quiz.schadule).toLocaleString()}
                      </td>
                      <td className="p-2 border-2">
                        <button
                          disabled={res.participants.length ? false : true}
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                          onClick={() =>
                            Navigate("/dashboard/ResultDetails", {
                              state: { qus: res },
                            })
                          }
                        >
                          View
                        </button>
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
