import { Card, Col, Row } from "antd";
import { useContext } from "react";
import Fade from "react-reveal/Fade";
import styled from "styled-components";
import SettingsContext from "../contexts/settings-context";
import Data from "../data";

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "#EDF9FE")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  padding: 1%;
`;

const Title = styled.div`
  font-size: 3.2em;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 3%;
`;

const CustomCard = styled(Card)`
  box-sizing: border-box;
  border: ${(props) =>
    props.darkMode ? "4px solid white" : "4px solid black"};
  border-radius: 10px;
  transition: transform 0.2s;
  margin-bottom: 10%;

  &:hover {
    border-color: ${(props) => (props.darkMode ? "white" : "black")};
    transform: scale(1.03);
  }
`;

const CurvedImage = styled.img`
  border-top-right-radius: 5px !important;
  border-top-left-radius: 5px !important;
  margin-left: 1px;
  margin-top: 1px;
  width: calc(100% - 2px);
`;

const CardBodyStyle = (darkMode) => ({
  padding: "5%",
  backgroundColor: darkMode ? "black" : "white",
  borderTop: darkMode ? "4px solid white" : "4px solid black",
  borderBottomRightRadius: 5,
  borderBottomLeftRadius: 5,
});

const CustomSpan = styled.span`
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

const GreySpan = styled.span`
  color: white;
`;

const Certificates = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <Container darkMode={darkMode} id="certificates">
      <Fade bottom>
        <Title>Certificates</Title>
      </Fade>
      <Row type="flex" justify="space-around">
        {Data.certificates.map((project) => (
          <Col lg={7} md={7} sm={11} xs={11} key={project.name}>
            <Fade big>
              <CustomCard
                hoverable
                cover={<CurvedImage alt="" src={project.image} />}
                bodyStyle={CardBodyStyle(darkMode)}
                darkMode={darkMode}
                onClick={() => window.open(project.link)}
              >
                <Card.Meta
                  title={
                    <CustomSpan darkMode={darkMode}>{project.name}</CustomSpan>
                  }
                  description={
                    <GreySpan style={{ color: "grey" }}>
                      {project.linkToShow}
                    </GreySpan>
                  }
                />
              </CustomCard>
            </Fade>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Certificates;
