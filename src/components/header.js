import { MenuOutlined } from "@ant-design/icons";
import { Collapse, Menu } from "antd";
import { useContext } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";
import SettingsContext from "../contexts/settings-context";
import Data from "../data";

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  background: ${(props) => (props.darkMode ? "#434343" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-family: "Dancing Script", cursive;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: unset;
    margin-top: -1.5%;
  }
`;

const LinksContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: -5%;
    width: 100%;
  }
`;

const Link = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #cc5200;
  }

  @media (max-width: 768px) {
    padding: 3% 0%;
    width: 100%;
    border-bottom: 1px solid black;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 2.3%;
    margin-top: 2%;

    &:before {
      content: "Theme";
      padding-right: 10%;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const Header = ({ toggleDarkMode }) => {
  const contextData = useContext(SettingsContext);
  const { isMobile, darkMode } = contextData;
  return (
    <>
      <HeaderContainer darkMode={darkMode}>
        <Logo>&lt;{Data.name}/&gt;</Logo>
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
      <Collapse
        bordered={false}
        ghost={true}
        expandIcon={() => <MenuOutlined style={{ fontSize: "1.6em" }} />}
        expandIconPosition="right"
      >
        <Collapse.Panel header={<Logo>&lt;{Data.name}/&gt;</Logo>} key="1">
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
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

export default Header;
