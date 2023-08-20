import { useState, useEffect } from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

const ThemePicker = () => {
  const [theme, setTheme] = useState("");

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "rain" ? "dracula" : "rain"));
  };

  useEffect(() => {
    // Set theme based on the attribute after the component has mounted
    const initialTheme =
      document.documentElement.getAttribute("data-toggle-theme");
    setTheme(initialTheme);
    console.log(initialTheme);
  }, []);

  // useEffect to update the data-theme attribute on the document element
  useEffect(() => {
    document.documentElement.setAttribute("data-toggle-theme", theme);
  }, [theme]);

  return (
    //check against the light mode
    <button
      className='btn join-item'
      data-act-class='ACTIVECLASS'
      data-toggle-theme='dracula,rain'
      onClick={toggleTheme}
    >
      {theme === "rain" ? (
        //if the theme is light, set light
        <RiSunLine className='w-4 h-4' />
      ) : (
        //if the themeis dark, set dark
        <RiMoonLine className='w-4 h-4' />
      )}
    </button>
  );
};

export default ThemePicker;
