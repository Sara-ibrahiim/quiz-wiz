import { Students_URls } from "@/constants/End-points";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import studentImg from "../../../assets/stu.jpg";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
export default function Students() {
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
  let getAllStudents = async () => {
    try {
      let response = await axios.get(Students_URls.getStudentsList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStudent(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
   {isModalOpen && studentId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40 ">
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
      <div className="w-full  md:grid-cols-12 grid ">
        {student.slice(0, 18).map((user: any) => (
          <div
            className="md:col-span-4 sm:col-span-6 xs:col-span-12"
            key={user._id}
          >
            <div className="border-[1px] border-[#ECECEC] rounded pe-2 m-2 flex ">
              <div className="w-3/12 me-3">
                <img src={studentImg} alt="" className="w-full rounded" />
              </div>

              <div className=" flex pt-5 w-full">
                <div className="w-11/12 flex ">
                  <h2 className="font-semibold">
                    {user.first_name} {""} {user.last_name}
                  </h2>
                  <div
                    className="ml-auto pt-1"
                    onClick={() => {
                      getStudentById(user._id);
                    }}
                  >
                    <FaRegEye style={{ cursor: "pointer", fontSize: "17px" }} />
                  </div>

                  {/* <p className="text-[13px] text-[#0d1321cc] dark:text-lightText ">
                    Group: {user.group.name} {""}|{""} Average score:{" "}
                    {Math.floor(user.avg_score)}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
