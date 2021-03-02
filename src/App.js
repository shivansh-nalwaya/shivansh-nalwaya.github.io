import { useState, useEffect } from "react";
import Header from "./components/header";
import Greeting from "./components/greeting";
import SettingsContext from "./contexts/settings-context";
import SkillSet from "./components/skillset";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 762);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const setWindowWidth = () => setIsMobile(window.innerWidth <= 762);

  useEffect(() => {
    setWindowWidth();
    if (darkMode) require("antd/dist/antd.dark.css");
    else require("antd/dist/antd.css");
  }, [darkMode]);
  window.addEventListener("resize", setWindowWidth);

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <SettingsContext.Provider value={{ isMobile, darkMode }}>
      <Header toggleDarkMode={toggleDarkMode} />
      <Greeting />
      <SkillSet />
    </SettingsContext.Provider>
  );
};

export default App;
