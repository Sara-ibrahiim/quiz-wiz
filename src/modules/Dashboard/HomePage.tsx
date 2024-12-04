import TopStudent from "./TopStudent";
import UpComingQuizzes from "../instructor/Quizzes/UpComingQuizzes";
import { QUIZES_URLS } from "@/constants/End-points";

export default function HomePage() {
  return (
    <>
      <div className="p-4 gap-3 grid  sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-12 w-full ">
        <div className="md:col-span-7 md:mt-2">
          <div className="max-h-[800px] overflow-auto flex flex-col gap-3 p-2 border-[1px] border-[#ECECEC] rounded">
            <UpComingQuizzes api={QUIZES_URLS.getIncoming5Quizes} />
          </div>
        </div>
        <div className="md:col-span-5 xs:py-2 sm:py-2">
          <div className=" border-[1px] border-[#ECECEC] rounded p-2 w-full">
            <TopStudent />
          </div>
        </div>
      </div>
    </>
  );
}
