import { useContext } from "react";
import Fade from "react-reveal/Fade";
import styled from "styled-components";
import SettingsContext from "../contexts/settings-context";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "#EDF9FE")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  padding: 1%;
`;

const Title = styled.div`
  font-size: 3.2em;
  text-align: center;
  margin-bottom: 3%;
`;

const SkillItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 1%;
  margin: 2% 1%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const SkillImage = styled.img`
  width: 100px;
`;

const SkillTitle = styled.div`
  font-size: 1.2em;
  text-align: center;
  margin-top: 8%;
`;

const SkillSet = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <Container darkMode={darkMode}>
      <Fade bottom>
        <Title>What I'm good at?</Title>
        <>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>React JS</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>React Native</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>Ruby on Rails</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>Node JS</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>Python</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>PostgreSQL</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>NoSQL</SkillTitle>
          </SkillItem>
          <SkillItem>
            <SkillImage src="/assets/images/react.png" alt="" />
            <SkillTitle>Docker</SkillTitle>
          </SkillItem>
        </>
      </Fade>
    </Container>
  );
};

export default SkillSet;
