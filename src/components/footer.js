import { useContext } from "react";
import Fade from "react-reveal/Fade";
import styled, { keyframes } from "styled-components";
import SettingsContext from "../contexts/settings-context";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "#EDF9FE")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  padding: 1%;
`;

const Text = styled.div`
  text-align: center;
`;

const zoom = keyframes`
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1.5);
  }
`;

const Animated = styled.div`
  display: inline-block;
  margin: 0% 0.3%;
  color: red;
  animation: ${zoom} 0.5s linear infinite alternate;
`;

const Footer = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <Container darkMode={darkMode}>
      <Fade>
        <Text>
          Made with <Animated>❤️</Animated> by Shivansh Nalwaya
        </Text>
      </Fade>
    </Container>
  );
};

export default Footer;
