import SwitchLanguageButton from "./components/SwitchLanguageButton/SwitchLanguageBUtton";
import ThemeSelect from "./components/theme/ThemeSelect";

function App() {
  return (
    <>
      <div className=" h-screen flex justify-center items-center text-lg">
        <SwitchLanguageButton />
        <ThemeSelect />
      </div>
    </>
  );
}

export default App;
