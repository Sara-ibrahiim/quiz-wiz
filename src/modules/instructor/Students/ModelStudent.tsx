import { Students_URls } from '@/constants/End-points';
import axios from 'axios';
import React, { useState } from 'react'

export default function ModelStudent() {
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
  return (
    <div>
         {isModalOpen &&  (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
          <div className="modal-box bg-primaryLight  text-left rounded p-10">
          

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
    </div>
  )
}
