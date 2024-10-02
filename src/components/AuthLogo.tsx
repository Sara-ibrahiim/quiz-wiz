import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
const AuthLogo = () => {
  return (
    <div className="logo dark:text-primaryLight  text-primaryDark flex items-center">
      <span className="text-4xl icon">
        <IoIosCloseCircleOutline />
      </span>
      <span className="text-4xl">
        <IoCheckmarkCircleOutline />
      </span>
      <span className="text-xl">| Quizwiz</span>
    </div>
  );
};

export default AuthLogo;
