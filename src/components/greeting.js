import { Button } from "antd";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import SettingsContext from "../contexts/settings-context";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  height: 100vh;
  padding: calc(10vh + 1%) 1% 1% 1%;
  display: flex;
  justify-content: center;
`;

const IntroBox = styled.div`
  height: 50vh;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
`;

const Title = styled.div`
  font-size: 3.2em;
  text-align: center;
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
  text-align: center;
`;

const Desc = styled.div`
  width: 60%;
  padding: 2.5%;
  padding-bottom: 1%;
  text-align: center;
  font-size: 1.4em;
`;

const Links = styled.div`
  width: 60%;
  text-align: center;
`;

const LinkButton = styled(Button)`
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  color: white;
  margin: 2%;

  &:hover {
    background-color: #000;
    border-color: #000;
    color: white;
  }
`;

const Greeting = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <Container darkMode={darkMode}>
      <IntroBox>
        <Title>
          Hi, I'm Shivansh Nalwaya <Animated>👋</Animated>
        </Title>
        <SubTitle>Full Stack Developer</SubTitle>
        <Desc>
          A passionate Full Stack Software Developer 🚀 having an experience of
          building Web, Mobile and Desktop applications with ReactJS / NodeJS /
          React Native / ElectronJS and some other cool libraries and
          frameworks.
        </Desc>
        <Links>
          <LinkButton
            shape="circle"
            size="large"
            color="#EA4335"
            icon={<i class="fa fa-envelope" />}
          />
          <LinkButton
            shape="circle"
            size="large"
            color="#1976A8"
            icon={<i class="fab fa-linkedin-in" />}
          />
          <LinkButton
            shape="circle"
            size="large"
            color="#24292E"
            icon={<i class="fab fa-github" />}
          />
          <LinkButton
            shape="circle"
            size="large"
            color="#F28031"
            icon={<i class="fab fa-stack-overflow" />}
          />
          <LinkButton
            shape="circle"
            size="large"
            color="#5DB558"
            icon={<i class="fab fa-hackerrank" />}
          />
        </Links>
      </IntroBox>
    </Container>
  );
};

export default Greeting;
