import { useState, useEffect } from "react";
import Header from "./components/header";
import Intro from "./components/intro";
import SettingsContext from "./contexts/settings-context";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 762);
  const [darkMode, setDarkMode] = useState(false);

  const setWindowWidth = () => setIsMobile(window.innerWidth <= 762);

  useEffect(setWindowWidth, []);
  window.addEventListener("resize", setWindowWidth);

  return (
    <SettingsContext.Provider value={{ isMobile, darkMode }}>
      <Header toggleDarkMode={() => setDarkMode(!darkMode)} />
      <Intro />
    </SettingsContext.Provider>
  );
};

export default App;
