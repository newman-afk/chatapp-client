import { createContext, useContext, useEffect, useState } from "react";
import languageData from "../assets/language";
import {
  getValueFromSessionStorage,
  setValueToSessionStorage,
} from "../hooks/useStorage";

const LanguageContext = createContext();

const key = `${import.meta.env.VITE_PREFIX}language`;

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState();

  const [siteContent, setSiteContent] = useState();

  useEffect(() => {
    if (language !== undefined && language !== null) {
      setSiteContent(languageData[language]);
      setValueToSessionStorage(key, language);
    }
  }, [language]);

  useEffect(() => {
    const languageType = getValueFromSessionStorage(key);
    if (languageType === null || languageType === undefined) {
      navigator.language === "zh-CN" ? setLanguage("CN") : setLanguage("EN");
    } else {
      setLanguage(languageType);
    }
    // if (navigator.language.includes("en")) setLanguage("EN");
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, siteContent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default function useLanguageContext() {
  return useContext(LanguageContext);
}
