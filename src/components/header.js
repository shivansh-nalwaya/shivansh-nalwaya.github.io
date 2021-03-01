import styled from "styled-components";
import { useContext } from "react";
import SettingsContext from "../contexts/settings-context";
import DarkModeToggle from "react-dark-mode-toggle";

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.darkMode ? "#434343" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

const Logo = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-family: "Dancing Script", cursive;
`;

const LinksContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Link = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #cc5200;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = ({ toggleDarkMode }) => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <HeaderContainer darkMode={darkMode}>
      <Logo>&lt;Shivansh/&gt;</Logo>
      <LinksContainer>
        <Link>Skills</Link>
        <Link>Experience</Link>
        <Link>Projects</Link>
        <Link>About</Link>
        <Link>Contact</Link>
        <ToggleContainer>
          <DarkModeToggle
            onChange={toggleDarkMode}
            checked={contextData.darkMode}
            size={70}
            className="dark-mode-button"
          />
        </ToggleContainer>
      </LinksContainer>
    </HeaderContainer>
  );
};

export default Header;
