import { Button } from "antd";
import styled from "styled-components";
import Data from "../data";

const Links = styled.div`
  margin-top: 1%;
`;

const LinkButton = styled(Button)`
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  color: white;
  margin-right: 2%;

  &:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
    color: white;
  }

  &:focus {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
    color: white;
  }
`;

const ContactLinks = () => {
  return (
    <Links>
      {Data.links.map((link) => (
        <LinkButton
          key={link.link}
          shape="circle"
          size="large"
          color={link.color}
          icon={<i className={link.icon} />}
          onClick={() => window.open(link.link)}
        />
      ))}
    </Links>
  );
};

export default ContactLinks;
