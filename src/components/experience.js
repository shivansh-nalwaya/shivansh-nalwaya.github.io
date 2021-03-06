import { useContext } from "react";
import Fade from "react-reveal/Fade";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import SettingsContext from "../contexts/settings-context";
import Data from "../data";
import { Tag } from "antd";

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

const Experience = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode, isMobile } = contextData;
  return (
    <Container darkMode={darkMode}>
      <Fade>
        <Title>Experience</Title>
        <VerticalTimeline
          className={darkMode ? "vertical-timeline" : "vertical-timeline-light"}
          animate={!isMobile}
        >
          {Data.experience.map((exp) => (
            <VerticalTimelineElement
              key={exp.companyName}
              contentArrowStyle={{
                borderRightColor: darkMode ? "white" : "black",
              }}
              contentStyle={{
                background: darkMode ? "black" : "white",
                boxShadow: `inset 0px 0px 0px 4px ${
                  darkMode ? "white" : "black"
                }`,
                color: "#fff",
              }}
              date={
                <div
                  style={{
                    marginTop: "-3%",
                    color: darkMode ? "white" : "black",
                  }}
                >
                  <div>{exp.companyName}</div>
                  <div>{exp.date}</div>
                </div>
              }
              iconStyle={{
                background: darkMode ? "black" : "white",
                boxShadow: `0 0 0 4px ${darkMode ? "white" : "black"}`,
                color: "#fff",
              }}
              icon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img src={exp.logo} style={{ width: "100%" }} />
                </div>
              }
            >
              <h3 style={{ color: darkMode ? "white" : "black" }}>
                {exp.role}
              </h3>
              <h4 style={{ color: darkMode ? "white" : "black" }}>
                {exp.location}
              </h4>
              <p style={{ color: darkMode ? "white" : "black" }}>{exp.desc}</p>
              <br />
              {exp.techStack.map((stack) => (
                <Tag color="grey" key={`${exp.companyName}-${stack}`}>
                  {stack}
                </Tag>
              ))}
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{
              background: darkMode ? "black" : "white",
              boxShadow: `0 0 0 4px ${darkMode ? "white" : "black"}`,
              marginTop: "1%",
            }}
          />
        </VerticalTimeline>
      </Fade>
    </Container>
  );
};

export default Experience;
