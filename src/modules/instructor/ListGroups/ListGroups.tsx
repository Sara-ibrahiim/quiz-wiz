import { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, fetchGroups } from "../../../store/groupSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NewGroupDialog from "@/components/GroupDialog";

export default function GroupsList() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [IdUpdate, setIdUpdate] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>();
  const { groups, status, message } = useSelector((store: RootState) => store.groups);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGroups());
    }
  }, [status, dispatch]);

  if (status == "rejected") {
    toast.error(message);
  }

  if (status == "succeeded") {
    toast.error(message);
  }

  const handleDelete = (id: string): void => {
    dispatch(deleteGroup(id));
  };

  const handleIsUpdate = (id: string): void =>{
    setIsUpdate(true);
    setIsDialogOpen(true)
    setIdUpdate(id)
  }

  const handleIsAdd = (): void =>{
    setIsUpdate(false);
    setIsDialogOpen(true)
  }

  return (
    <>
      {status === "pending" ? (
        <h3>pending</h3>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Groups list</h1>
            <Button onClick={handleIsAdd} className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
              <IoAddCircle size={22} />
              Add Group
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  {/* info */}
                  <div>
                    <h3 className="font-semibold">Group: {group.name}</h3>
                    <p className="text-sm text-gray-600">
                      {group.students.length} of students: {group.max_students}
                    </p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2">
                      <Button onClick={()=>handleIsUpdate(group._id)} className="p-2 hover:bg-gray-200 rounded hover:text-green-400">
                        <FaPenToSquare className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <NewGroupDialog IdUpdate={IdUpdate} isUpdate={isUpdate} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
                    {/* Delete action */}
                    <button className="p-2 hover:bg-gray-200 rounded hover:text-red-400">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <FiTrash2 className="h-4 w-4" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your group and remove your
                              group data from server.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(group._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="p-3 mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem className="border rounded-md">
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem className="border rounded-md">
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem className="border rounded-md">
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
}
