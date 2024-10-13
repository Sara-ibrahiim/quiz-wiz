import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const AuthLogo = () => {
  return (
    <div className="logo dark:text-primaryLight  text-primaryDark ">
      <Link to="/dashboard" className="flex items-center justify-start w-fit">
        <span className="text-4xl icon ">
          <IoIosCloseCircleOutline />
        </span>
        <span className="text-4xl">
          <IoCheckmarkCircleOutline />
        </span>
        <span className="text-xl">|Quizwiz</span>
      </Link>
    </div>
  );
};

export default AuthLogo;
