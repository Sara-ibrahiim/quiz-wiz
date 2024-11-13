import React from 'react'
import NotImg from "../assets/../assets/404.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
export default function NotFound() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);
  const path =
    profile?.role === "Instructor"
      ? "/dashboard/home-page"
      : profile?.role === "Student"
      ? "/dashboard/quizzes"
      : "/login";
  return (
    <div>
      <div className='notFound'>

      <div className="flex justify-center items-end h-screen ">
        <Link to={path}>
        <div className="mb-11 bg-[#fd9b6b] p-4 font-bold rounded hover:bg-[#f39b6f]" > Back To Home </div>
         </Link>
       
          </div>

      </div>

      
    </div>
  )
}
