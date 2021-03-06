import { useState, useEffect } from "react";
import Header from "./components/header";
import Greeting from "./components/greeting";
import SettingsContext from "./contexts/settings-context";
import SkillSet from "./components/skillset";
import Experience from "./components/experience";
import "antd/dist/antd.css";
import Projects from "./components/projects";
import Certificates from "./components/certificates";
import Contact from "./components/contact";
import Footer from "./components/footer";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 762);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const setWindowWidth = () => setIsMobile(window.innerWidth <= 762);

  useEffect(() => {
    setWindowWidth();
  }, []);

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
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </SettingsContext.Provider>
  );
};

export default App;
