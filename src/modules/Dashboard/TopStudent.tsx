import { Base_Url, Students_URls } from "@/constants/End-points";
import axios from "axios";
import studentImg from "../../assets/student-back.jpg";
import React, { useEffect, useState } from "react";
import { FaArrowCircleRight, FaLongArrowAltRight } from "react-icons/fa";

export default function TopStudent() {
  const [student, setStudent] = useState([]);
  const [studentId, setStudentId] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  let getStudentById = async (id: string) => {
    try {
      let response = await axios.get(Students_URls.studentsGetById(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStudentId(response.data);
      setIsModalOpen(true);
    } catch (error) {}
  };
  let getTopStudent = async () => {
    try {
      let response = await axios.get(Students_URls.topStudents, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStudent(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTopStudent();
  }, []);

  return (
    <>
      {isModalOpen && studentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
          <div className="modal-box bg-primaryLight  text-left rounded p-10">
            <h6 className="font-bold  text-primaryDark">
              Name : {studentId.first_name} {""} {studentId.last_name}
            </h6>
            <h6 className="font-bold  text-primaryDark">
              Email : {studentId.email}
            </h6>
            <h6 className="font-bold  text-primaryDark">
              status : {studentId.status}
            </h6>
            <h6 className="font-bold  text-primaryDark">
              Group : {studentId.group.name}
            </h6>
            <div></div>

            <div className="modal-action flex justify-center gap-4">
              <button
                className="btn font-bold ml-auto mt-2  text-[#C5D86D] "
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full ">
        <div className="flex px-2  py-1">
          <h3 className=" text-primaryDark dark:text-lightText font-medium text-xl">
            Top 5 Students{" "}
          </h3>
          <div className="flex ml-auto cursor-pointer">
            <h3 className=" text-primaryDark dark:text-lightText text-sm ml-auto mt-1 ">
              All Students
            </h3>
            <FaLongArrowAltRight className="text-[#C5D86D] text-xl ms-1  mt-1 " />
          </div>
        </div>

        {student.map((user: any) => (
          <div className="" key={user._id}>
            <div className="border-[1px] border-[#ECECEC] rounded pe-2 m-2 flex ">
              <div className="w-3/12 me-3">
                <img src={studentImg} alt="" className="w-full rounded" />
              </div>

              <div className=" flex pt-3 w-full">
                <div className="w-11/12">
                  <h2 className="font-semibold">
                    {user.first_name} {""} {user.last_name}
                  </h2>
                  <p className="text-[13px] text-[#0d1321cc] dark:text-lightText ">
                    Group: {user.group.name} {""}|{""} Average score:{" "}
                    {Math.floor(user.avg_score)}
                  </p>
                </div>
                <div className="pt-3">
                  <FaArrowCircleRight
                    onClick={() => {
                      getStudentById(user._id);
                    }}
                    className=" text-2xl cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
