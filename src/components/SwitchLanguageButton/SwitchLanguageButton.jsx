import uselanguageContext from "../../globalContext/languageContext";

function SwitchLanguageButton() {
  const { language, setLanguage, siteContent } = uselanguageContext();
  function togglelanguage() {
    setLanguage((currentLanguage) => {
      return currentLanguage === "CN" ? "EN" : "CN";
    });
  }
  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip={siteContent?.tooltips.switchLanguage}
    >
      <button className="btn btn-ghost" onClick={togglelanguage}>
        {language === "CN" && "English"}
        {language === "EN" && "中文"}
      </button>
    </div>
  );
}

export default SwitchLanguageButton;
