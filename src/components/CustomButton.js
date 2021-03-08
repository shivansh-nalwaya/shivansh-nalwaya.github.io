import { Button } from "antd";
import styled from "styled-components";

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

const CustomButton = ({ children, ...props }) => {
  return <ActionButton {...props}>{children}</ActionButton>;
};

export default CustomButton;
