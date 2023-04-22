import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import uselanguageContext from "../../languageContext";

function ThemeSelect() {
  const PREFIX = "rust-chat-app-";
  const {
    siteContent: {
      theme: { label, options },
    },
  } = uselanguageContext();
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <>
      <select
        data-choose-theme
        data-key={`${PREFIX}theme`}
        className="select select-ghost select-xs"
      >
        {options.map((theme) => (
          <option value={theme.value} key={theme.value}>
            {theme.content}
          </option>
        ))}
      </select>
    </>
  );
}

export default ThemeSelect;
