import { useEffect, useState } from "react";

const ToggleThemeButton = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prevState) => !prevState);
  };

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
    >
      {isDark ? (
        <span role="img" aria-label="Sun">
          🌞
        </span>
      ) : (
        <span role="img" aria-label="Moon">
          🌙
        </span>
      )}
    </button>
  );
};

export default ToggleThemeButton;
