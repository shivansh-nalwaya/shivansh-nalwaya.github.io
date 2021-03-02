import { Card, Col, Row } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import SettingsContext from "../contexts/settings-context";
import Fade from "react-reveal/Fade";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  height: 100vh;
  padding: calc(10vh + 1%) 1% 1% 1%;
`;

const Title = styled.div`
  font-size: 3.2em;
  text-align: center;
  margin-bottom: 3%;
`;

const SkillCategory = styled.div`
  font-size: 1.4em;
  text-align: center;
`;

const SkillImage = styled.img`
  width: 100px;
  padding: 0% 20%;
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
      <Title>What I'm good at?</Title>
      <Fade left>
        <Row type="flex" justify="space-around">
          <Col>
            <Card
              title={<SkillCategory>Front End</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>React JS</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Next JS</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Vue JS</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card
              title={<SkillCategory>Mobile Apps</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>React Native</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card
              title={<SkillCategory>Desktop Apps</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Electron JS</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card
              title={<SkillCategory>Back End</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Ruby on Rails</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Node JS</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Django</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Fade>
      <br />
      <Fade right>
        <Row type="flex" justify="space-around">
          <Col>
            <Card
              title={<SkillCategory>Data Analytics</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Python</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>R</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card
              title={<SkillCategory>DBMS</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>PostgreSQL</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>NoSQL</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Redis</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card
              title={<SkillCategory>Others</SkillCategory>}
              size="small"
              bordered={false}
            >
              <Row type="flex" justify="space-around">
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Git</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Docker</SkillTitle>
                </Col>
                <Col>
                  <SkillImage src="/assets/images/react.png" alt="" />
                  <SkillTitle>Photoshop</SkillTitle>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Fade>
    </Container>
  );
};

export default SkillSet;
