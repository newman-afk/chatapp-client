import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import uselanguageContext from "../../languageContext";

const key = `${import.meta.env.VITE_PREFIX}theme`;
function ThemeSelect() {
  const { siteContent } = uselanguageContext();
  const [pickedTheme, setPickedTheme] = useState();

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project

    const pickedTheme = localStorage.getItem(key);
    if (
      pickedTheme !== null &&
      pickedTheme !== undefined &&
      pickedTheme !== ""
    ) {
      setPickedTheme(pickedTheme);
    }
  }, []);

  return (
    <>
      <select
        data-choose-theme
        data-key={key}
        className="select select-ghost select-xs"
        value={pickedTheme}
        onChange={(e) => setPickedTheme(e.target.value)}
      >
        {siteContent?.theme.options.map((theme) => (
          <option value={theme.value} key={theme.value}>
            {theme.content}
          </option>
        ))}
      </select>
    </>
  );
}

export default ThemeSelect;
