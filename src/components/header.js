import styled from "styled-components";
import { useContext } from "react";
import SettingsContext from "../contexts/settings-context";

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.div`
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  padding-top: 3px;
  margin: 0% 1%;
  cursor: pointer;
  border-bottom: 3px solid transparent;

  &:hover {
    color: #cc5200;
    border-color: #cc5200;
  }
`;

const Header = () => {
  const contextData = useContext(SettingsContext);
  return (
    <HeaderContainer>
      <Link>Home</Link>
      <Link>About</Link>
      <Link>Projects</Link>
      <Link>Experience</Link>
      <Link>Contact</Link>
    </HeaderContainer>
  );
};

export default Header;
