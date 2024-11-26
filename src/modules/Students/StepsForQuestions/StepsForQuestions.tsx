import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

export default function StepsForQuestions() {
  const arrayOfNum = [1, 2, 3, 4, 5];
  const arrayOfAnswers = ["A", "B", "C", "D"];
  const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };
  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };
  return (
    <>
      <FormWizard onComplete={handleComplete} onTabChange={tabChanged}>
        {arrayOfNum.map((num) => (
          <FormWizard.TabContent key={num}>
            <div className="flex items-center justify-between gap-5 mx-5">
              <h3 className="w-full py-2 font-bold text-center text-white bg-red-500 rounded-md text-md xl:text-xl lg:text-lg ">
                what is html
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-5 text-lg font-bold tracking-wider md:grid-cols-2">
              {arrayOfAnswers.map((answer) => (
                <div
                  key={answer}
                  className="flex font-bold  text-black border-4 py-2  rounded-full px-5 items-center hover:bg-emerald-400  group duration-500 transition-all inputWrapper "
                >
                  <div className="size-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char dark:text-white">
                    {answer}
                  </div>
                  <input
                    type="radio"
                    id={`option${answer}`}
                    name="questions"
                    className="hidden"
                    value={answer}
                  />
                  <span className="text-[12px] md:text-[15px] text-center m-auto dark:text-white">
                    what is html
                  </span>
                </div>
              ))}
            </div>
          </FormWizard.TabContent>
        ))}
      </FormWizard>
      {/* add style */}
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </>
  );
}
