import { useContext } from "react";
import Fade from "react-reveal/Fade";
import styled, { keyframes } from "styled-components";
import SettingsContext from "../contexts/settings-context";
import Data from "../data";
import ContactLinks from "./contact-links";
import CustomButton from "./CustomButton";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "#EDF9FE")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  padding: 1%;
`;

const IntroBox = styled.div`
  padding: 2%;
  padding-top: 5%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0% 2%;
  }
`;

const Image = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0% 2%;
  }
`;

const Title = styled.div`
  font-size: 3.2em;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(-0deg);
  }
  to {
    transform: rotate(10deg);
  }
`;

const Animated = styled.span`
  display: inline-block;
  animation: ${rotate} 0.15s linear infinite alternate;
`;

const SubTitle = styled.div`
  font-size: 2em;

  @media (max-width: 768px) {
    font-size: 1.4em;
  }
`;

const Desc = styled.div`
  padding: 1% 0%;
  font-size: 1.4em;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const Greeting = () => {
  const contextData = useContext(SettingsContext);
  const { isMobile, darkMode } = contextData;
  return (
    <Container darkMode={darkMode} id="home">
      <IntroBox>
        <Text>
          <Fade bottom={!isMobile} left={isMobile}>
            <>
              <Title>
                {Data.title} <Animated>👋</Animated>
              </Title>
              <SubTitle>{Data.role}</SubTitle>
              <Desc>{Data.background}</Desc>
              <ContactLinks />
              <CustomButton size="large">CONTACT ME</CustomButton>
              <CustomButton size="large">SEE MY RESUME</CustomButton>
            </>
          </Fade>
        </Text>
        <Image>
          <Fade bottom={!isMobile} right={isMobile}>
            <img src="/assets/images/intro-avatar.svg" alt="" />
          </Fade>
        </Image>
      </IntroBox>
    </Container>
  );
};

export default Greeting;
