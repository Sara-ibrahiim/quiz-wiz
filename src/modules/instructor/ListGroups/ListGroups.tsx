import { useEffect } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../../store/ListGroupsSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { toast } from "react-toastify";

export default function GroupsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, status, error } = useSelector<RootState>(
    (store) => store.listGroups
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGroups());
    }
  }, [status, dispatch]);

  if (error) {
    toast.error(error);
  }

  return (
    <>
      {status === "pending" ? (
        <h3>pending</h3>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Groups list</h1>
            <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
              <IoAddCircle size={22} />
              Add Group
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  {/* info */}
                  <div>
                    <h3 className="font-semibold">Group: {group.name}</h3>
                    <p className="text-sm text-gray-600">
                      No. of students: {group.students}
                    </p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded hover:text-green-400">
                      <FaPenToSquare className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded hover:text-red-400">
                      <FiTrash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center p-3 mt-4 gap-2">
            {[1, 2, 3].map((page) => (
              <button key={page} className="px-3 py-1 border rounded-md">
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
