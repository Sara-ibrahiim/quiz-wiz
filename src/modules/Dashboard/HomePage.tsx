import React from 'react'
import TopStudent from './TopStudent'

export default function HomePage() {
  return (
    <>

    <div className='flex p-4  grid  sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-12 w-full'>
    <div className='md:col-span-7'>
<h1>Quiz</h1>
      </div> 
      <div className='md:col-span-5 xs:py-2 sm:py-2'>
       <div className=' border-[1px] border-[#ECECEC] rounded p-2 w-full'>
<TopStudent/>
       </div>
      </div>
    </div>
      
    </>
  )
}
