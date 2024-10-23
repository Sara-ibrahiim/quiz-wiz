
import TopStudent from './TopStudent'
import UpComingQuiz from './UpComingQuiz'

export default function HomePage() {
  return (
    <>

    <div className='flex p-4  grid  sm:grid-cols-1 xs:grid-cols-1 gap-5 md:grid-cols-12 w-full'>
    <div className='md:col-span-7'>
<div className='border-[1px] border-[#ECECEC] rounded px-2 pb-4 pt-3  w-full'>
<UpComingQuiz/>
</div>
      </div> 
      <div className='md:col-span-5 xs:py-2 sm:py-2'>
       <div className=' border-[1px] border-[#ECECEC] rounded px-2 pb-4 pt-3 w-full'>
<TopStudent/>
       </div>
      </div>
    </div>
      
    </>
  )
}
