import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { RootState } from "../../store/store";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div>
      <button
        className="bg-primaryDark p-1 rounded dark:bg-secondaryLight text-lg text-secondaryLight dark:text-primaryDark"
        onClick={() => dispatch(toggleTheme())}
      >
        <BsSunFill />
      </button>
    </div>
  );
};

export default ThemeToggle;
