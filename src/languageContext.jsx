import { createContext, useContext, useEffect, useState } from "react";
import languageData from "./language";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("CN");

  const [siteContent, setSiteContent] = useState(languageData[language]);

  useEffect(() => {
    setSiteContent(languageData[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, siteContent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default function uselanguageContext() {
  return useContext(LanguageContext);
}
