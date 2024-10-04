import { AuthButtonProps } from "../utils/interfaces";
import CheckMark from "../assets/check-mark.png";

const AuthButton = ({ title }: AuthButtonProps) => {
  return (
    <div>
      <button
        type="submit"
        className="flex gap-4 bg-primaryDark px-7 py-4 rounded-md text-white dark:bg-primaryLight  dark:text-primaryDark font-semibold"
      >
        <span>{title}</span>
        <span className="dark:text-white text-white rounded-full bg-primaryLight border-none flex justify-center items-center">
          <img
            src={CheckMark}
            className="w-full h-full border-none rounded-full"
            alt="check mark icon to define the button"
          />
        </span>
      </button>
    </div>
  );
};

export default AuthButton;
