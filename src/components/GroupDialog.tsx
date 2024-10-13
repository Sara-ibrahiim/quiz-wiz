import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Check } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { addGroup, updateGroup } from "@/store/groupSlice"
import { fetchStudents } from "@/store/studentSlice"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function NewGroupDialog({ isOpen, onClose, isUpdate, IdUpdate }: { isOpen: boolean; onClose: () => void; isUpdate: boolean; IdUpdate: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { students, status } = useSelector((state: RootState) => state.students);

    useEffect(() => {
        if (status === "idle") {
          dispatch(fetchStudents());
        }
      }, [status, dispatch]);

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        if (isUpdate) {
          // dispatch update group
          dispatch(updateGroup({ data, id: IdUpdate }));
          onClose()
        } else {
          // dispatch add new group
          dispatch(addGroup(data))
          onClose()
        }
      };  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
        {isUpdate ? <DialogTitle className="text-xl font-semibold">Update Group</DialogTitle>
                  : <DialogTitle className="text-xl font-semibold">Set up a new Group</DialogTitle>}
          <div className="absolute right-4 top-4 flex space-x-2">
            <Button type="submit" size="icon" variant="ghost">
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button type="button" size="icon" variant="ghost" onClick={onClose}>
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
                    required: "Group name is required"
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
                <Select {...register("students")}>
                <SelectTrigger className="w-full ">
                    <SelectValue placeholder="List Students" />
                </SelectTrigger>
                <SelectContent>
                    {students.slice(0, 5).map((student, index) => (
                        <SelectItem key={index} value={student._id}>{student.first_name} {student.last_name}</SelectItem> // TO DO
                    ))}
                </SelectContent>
                </Select>
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
  )
}