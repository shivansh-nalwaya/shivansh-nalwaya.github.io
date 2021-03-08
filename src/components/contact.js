import { useContext } from "react";
import Fade from "react-reveal/Fade";
import styled from "styled-components";
import SettingsContext from "../contexts/settings-context";
import { Row, Col, Form, Input } from "antd";
import ContactLinks from "./contact-links";
import CustomButton from "./CustomButton";

const { TextArea } = Input;

const Container = styled.div`
  background: ${(props) => (props.darkMode ? "#434343" : "#EDF9FE")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  padding: 1%;
  padding-top: 3%;
`;

const Title = styled.div`
  font-size: 3.2em;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 3%;
`;

const SubTitle = styled.div`
  font-size: 1.4em;
  margin-bottom: 5%;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

const CustomInput = styled(Input)`
  margin-bottom: 4%;
  background: ${(props) => (props.darkMode ? "grey" : "white")};

  &:hover {
    border-color: black;
  }

  &:focus {
    border-color: black;
    box-shadow: none !important;
  }
`;

const CustomTextArea = styled(TextArea)`
  background: ${(props) => (props.darkMode ? "grey" : "white")};

  &:hover {
    border-color: black;
  }

  &:focus {
    border-color: black;
    box-shadow: none !important;
  }
`;

const Contact = () => {
  const contextData = useContext(SettingsContext);
  const { darkMode } = contextData;
  return (
    <Container darkMode={darkMode}>
      <Fade bottom>
        <Title>Contact Me</Title>
      </Fade>
      <Row type="flex" justify="space-around" align="top">
        <Col lg={11} md={11} sm={22} xs={22}>
          <Fade left>
            <SubTitle darkMode={darkMode}>Feel free to contact me!</SubTitle>
            <ContactLinks />
          </Fade>
        </Col>
        <Col lg={11} md={11} sm={22} xs={22}>
          <Fade right>
            <SubTitle darkMode={darkMode}>Or shoot a message!</SubTitle>
            <Form>
              <CustomInput darkMode={darkMode} size="large" placeholder="Name" />
              <CustomInput darkMode={darkMode} size="large" placeholder="Email" />
              <CustomTextArea darkMode={darkMode} size="large" placeholder="Message" rows={4} />
              <CustomButton size="large" style={{ width: "100%" }}>
                <i class="fas fa-paper-plane"></i>&nbsp;&nbsp;Send
              </CustomButton>
            </Form>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
