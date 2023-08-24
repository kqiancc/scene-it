import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const ThemePicker = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <label class='swap swap-flip'>
      <input type='checkbox' />
      <div
        data-set-theme='sceneit'
        data-act-class='ACTIVECLASS'
        class='swap-on'
      >
        <RiSunLine className='w-4 h-4' />
      </div>
      <div
        data-set-theme='sceneitLight'
        data-act-class='ACTIVECLASS'
        class='swap-off'
      >
        <RiMoonLine className='w-4 h-4' />
      </div>
    </label>
  );
};

export default ThemePicker;
