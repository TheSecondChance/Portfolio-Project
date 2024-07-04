import styled from "styled-components";

const IncorrectAnswer = () => {
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
      <Header>Your Answer is wrong☹</Header>
      <P>
        You Can Close the tab or referesh to if you want anthoer question again
      </P>
    </>
  );
};
export default IncorrectAnswer;
