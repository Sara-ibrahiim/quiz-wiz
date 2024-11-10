import React from 'react'
import NotImg from "../assets/../assets/404.jpg"
import { Link, useNavigate } from 'react-router-dom'
export default function NotFound() {

  return (
    <div>
      <div className='notFound'>

      <div className="flex justify-center items-end h-screen ">
        <Link to={"/dashboard"}>
        <div className="mb-11 bg-[#fd9b6b] p-4 font-bold rounded" > Back To Home </div>
         </Link>
       
          </div>

      </div>

      
    </div>
  )
}
