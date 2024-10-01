import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./themeSlice";
import { RootState } from "../../store/store";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    // Add the 'dark' class to <html> if the theme is dark
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div>
      <button
        className="bg-accent p-2 rounded"
        onClick={() => dispatch(toggleTheme())}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Example content */}
      <div className="p-10 bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-primaryLight">
        <p>This is the {theme} theme!</p>
      </div>
    </div>
  );
};

export default ThemeToggle;
