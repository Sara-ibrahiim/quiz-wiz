import { useEffect } from "react";
import { FaUserTie, FaUserPlus } from "react-icons/fa6";
import styles from "./LoginRegister.module.css";

interface AuthHeader {
  mode: string;
  setMode: (newMode: string) => void;
}

const AuthTitle = ({ mode, setMode }: AuthHeader) => {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-8 pt-5">
      <h1 className="text-primaryDark text-2xl font-semibold dark:text-accent">
        {mode === "Login"
          ? "Continue your learning journey with QuizWiz!"
          : "Create your account and start using QuizWiz!"}
      </h1>
      <div className="flex items-center gap-20 justify-center text-primaryLight">
        {/* Sign In Button */}
        <div
          className={`${styles.loginIcon} rounded-md py-5 px-9 border-4 ${
            mode === "Login"
              ? "border-primaryDark dark:border-accent dark:text-accent"
              : "border-transparent dark:text-primaryLight"
          } bg-secondaryLight dark:bg-gray-700 text-primaryDark  flex flex-col justify-center items-center gap-2 cursor-pointer`}
          onClick={() => setMode("Login")}
        >
          <FaUserTie />
          <p className="text-lg text-center">Sign In</p>
        </div>

        {/* Sign Up Button */}
        <div
          className={`${styles.registerIcon} rounded-md py-4 px-7 border-4 ${
            mode === "Register"
              ? "border-primaryDark dark:border-accent dark:text-accent"
              : "border-transparent dark:text-primaryLight"
          } bg-secondaryLight dark:bg-gray-700 text-primaryDark  flex flex-col justify-center items-center gap-2 cursor-pointer`}
          onClick={() => setMode("Register")}
        >
          <FaUserPlus />
          <p className="text-lg text-center">Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default AuthTitle;
