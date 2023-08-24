import { useState, useEffect } from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

const ThemePicker = () => {
  // Initially, try getting the theme from localStorage or fallback to dark mode
  const initialThemeFromLocalStorage = localStorage.getItem("theme");
  const [theme, setTheme] = useState(initialThemeFromLocalStorage || "");

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "sceneitLight" ? "sceneit" : "sceneitLight"
    );
  };

  useEffect(() => {
    // on mount, if theme is not already set from localStorage, set it based on the document attribute
    if (!theme) {
      const initialThemeFromDocument =
        document.documentElement.getAttribute("data-toggle-theme");
      if (initialThemeFromDocument) {
        setTheme(initialThemeFromDocument);
      }
    }
    console.log(
      "theme mounted",
      document.documentElement.getAttribute("data-toggle-theme", theme)
    );
  }, [theme]);

  // useEffect to update the data-theme attribute on the document element and store in localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-toggle-theme", theme);
    console.log(
      document.documentElement.getAttribute("data-toggle-theme", theme)
    );
  }, [theme]);

  return (
    <button
      className='btn join-item'
      data-act-class='ACTIVECLASS'
      data-toggle-theme='sceneit,sceneitLight'
      onClick={toggleTheme}
    >
      {theme === "sceneitLight" ? (
        <RiSunLine className='w-4 h-4' />
      ) : (
        <RiMoonLine className='w-4 h-4' />
      )}
    </button>
  );
};

export default ThemePicker;
