import { Tag } from "antd";
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
    <Container darkMode={darkMode} id="experience">
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
                isMobile ? (
                  <span />
                ) : (
                  <div
                    style={{
                      marginTop: "-3%",
                      color: darkMode ? "white" : "black",
                    }}
                  >
                    <div>{exp.companyName}</div>
                    <div>{exp.date}</div>
                  </div>
                )
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
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img src={exp.logo} alt="" style={{ width: "100%" }} />
                </div>
              }
            >
              {isMobile && (
                <div>
                  <h3 style={{ color: darkMode ? "white" : "black" }}>
                    {exp.companyName}
                  </h3>
                  <div style={{ marginTop: "-3%", marginBottom: "3%" }}>
                    {exp.date}
                  </div>
                </div>
              )}
              <h3 style={{ color: darkMode ? "white" : "black" }}>
                {exp.role}
              </h3>
              {isMobile || (
                <h4 style={{ color: darkMode ? "white" : "black" }}>
                  {exp.location}
                </h4>
              )}
              <p style={{ color: darkMode ? "white" : "black" }}>
                <ul>
                  {exp.desc.map((des, ind) => (
                    <li key={`${exp.companyName}-${ind}`}>{des}</li>
                  ))}
                </ul>
              </p>
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
              marginTop: isMobile ? "10%" : "1%",
            }}
          />
        </VerticalTimeline>
      </Fade>
    </Container>
  );
};

export default Experience;
