import { Button } from "antd";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import SettingsContext from "../contexts/settings-context";
import Fade from "react-reveal/Fade";
import Data from "../data";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  height: 100vh;
  padding: calc(10vh + 1%) 1% 1% 1%;
`;

const IntroBox = styled.div`
  padding: 2%;
  padding-top: 5%;
  display: flex;
`;

const Text = styled.div`
  width: 50%;
`;

const Image = styled.div`
  width: 50%;
`;

const Title = styled.div`
  font-size: 3.2em;
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
`;

const Desc = styled.div`
  padding: 1% 0%;
  font-size: 1.4em;
`;

const Links = styled.div`
  margin-top: 1%;
`;

const LinkButton = styled(Button)`
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  color: white;
  margin-right: 2%;

  &:hover {
    background-color: #000;
    border-color: #000;
    color: white;
  }
`;

const ActionButton = styled(Button)`
  margin: 3% 3% 3% 0%;
  background: #5cb86e;
  border-color: #5cb86e;
  color: white;
  border-radius: 5px;

  &:hover {
    border-color: #5cb86e;
    color: #5cb86e;
  }
`;

const Greeting = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <Container darkMode={darkMode}>
      <IntroBox>
        <Text>
          <Fade bottom>
            <>
              <Title>
                {Data.title} <Animated>👋</Animated>
              </Title>
              <SubTitle>{Data.role}</SubTitle>
              <Desc>{Data.background}</Desc>
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
              <ActionButton size="large">CONTACT ME</ActionButton>
              <ActionButton size="large">SEE MY RESUME</ActionButton>
            </>
          </Fade>
        </Text>
        <Image>
          <Fade right>
            <img src="/assets/images/intro-avatar.svg" alt="" />
          </Fade>
        </Image>
      </IntroBox>
    </Container>
  );
};

export default Greeting;
