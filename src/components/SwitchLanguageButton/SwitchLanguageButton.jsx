import uselanguageContext from "../../languageContext";

function SwitchLanguageButton() {
  const { language, setLanguage } = uselanguageContext();
  function togglelanguage() {
    setLanguage((currentLanguage) => {
      return currentLanguage === "CN" ? "EN" : "CN";
    });
  }
  return (
    <button className="btn btn-ghost" onClick={togglelanguage}>
      {language === "CN" && "English"}
      {language === "EN" && "中文"}
    </button>
  );
}

export default SwitchLanguageButton;
