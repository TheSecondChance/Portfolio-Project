import styled from "styled-components";

const CorrectAnswer = () => {
  const Header = styled.h4`
    color: #fff;
    text-align: center;
    margin-top: 22%;
  `;
  const P = styled.p`
    color: #fff;
    text-align: center;
    margin-bottom: 30%;
  `;
  return (
    <>
      <Header>You Get it😎</Header>
      <P>
        You Can Close the tab or referesh to if you want another question again
      </P>
    </>
  );
};

export default CorrectAnswer;
