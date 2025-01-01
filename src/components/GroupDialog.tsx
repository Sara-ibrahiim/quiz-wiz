import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Check, ChevronDownIcon, CheckIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addGroup, updateGroup } from "@/store/groupSlice";
import { fetchStudents } from "@/store/studentSlice";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";


interface FormData {
  students: string[];
  name: string;
}

export default function NewGroupDialog({
  isOpen,
  onClose,
  isUpdate,
  IdUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  isUpdate: boolean;
  IdUpdate: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { students, status } = useSelector(
    (state: RootState) => state.students
  );
  const [isOpenOption, setIsOpenOption] = useState(false);
  const toggleDropdown = () => setIsOpenOption(!isOpenOption);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      students: [],
      name: isUpdate ? "" : "",
    },
  });

 // const selectedOptions = watch("students");

  const handleOptionClick = (
    student: string,
    onChange: (value: string[]) => void
  ) => {
    let selectedOptions: string[] = [];
    const updatedOptions = selectedOptions.includes(student)
      ? selectedOptions.filter((item) => item !== student)
      : [...selectedOptions, student];
    onChange(updatedOptions);
  };

  const onSubmit = (data:any) => {
    if (isUpdate) {
      // dispatch update group
      dispatch(updateGroup({ data, id: IdUpdate }));
      onClose();
    } else {
      // dispatch add new group
      dispatch(addGroup(data));
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            {isUpdate ? (
              <DialogTitle className="text-xl font-semibold">
                Update Group
              </DialogTitle>
            ) : (
              <DialogTitle className="text-xl font-semibold">
                Set up a new Group
              </DialogTitle>
            )}
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="border"
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="border"
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <div>
              <Input
                placeholder="Group Name"
                // value={''}
                {...register("name", {
                  required: "Group name is required",
                })}
                className="w-full  border-none"
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Controller
                rules={{ required: "At least one student is required" }}
                name="students"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="w-full p-2 text-right bg-white text-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <span className="flex items-center justify-between">
                        {Array.isArray (value)&&  value?.length > 0
                          ? `selected ${value.length} students`
                          : "List Students"}
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                      </span>
                    </button>
                    {isOpenOption && (
                      <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto dark:bg-darkBackground bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                        {students.map((student) => (
                          <li
                            key={student._id}
                            onClick={() => student._id &&
                              handleOptionClick(student._id, onChange)
                            }
                            className={`px-2 py-2 text-right cursor-pointer hover:border flex items-center justify-between`}
                          >
                            {student.first_name} {student.last_name}
                            {Array.isArray (value)&& value.includes(student._id) && (
                              <CheckIcon className="w-5 h-5 text-blue-500" />
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              />
              {errors.students && (
                <span className="text-red-600 text-sm">
                  {errors.students.message}
                </span>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
