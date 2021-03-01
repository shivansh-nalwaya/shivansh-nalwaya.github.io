import styled, { keyframes } from "styled-components";

const Container = styled.div`
  background-image: url("/header-background.jpg");
  background-size: cover;
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
  color: white;
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
  color: white;
  font-size: 2em;
  text-align: center;
`;

const Desc = styled.div`
  width: 60%;
  padding: 2.5%;
  text-align: center;
  font-size: 1.4em;
  color: white;
`;

const Intro = () => {
  return (
    <Container>
      <IntroBox>
        <Title>
          Hi, I'm Shivansh Nalwaya <Animated>👋</Animated>
        </Title>
        <SubTitle>Full Stack Developer</SubTitle>
        <Desc>
          I am a Frontend Developer and Data Scientist.I like dabbling in
          various parts of frontend development and like to learn about new
          technologies, write technical articles or simply play games in my free
          time.
        </Desc>
      </IntroBox>
    </Container>
  );
};

export default Intro;
