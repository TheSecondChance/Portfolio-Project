import styled from "styled-components";

const Loading = () => {
  const Header = styled.h4`
    color: #fff;
    text-align: center;
    margin-top: 20%;
  `;
  const P = styled.p`
    padding: 4px;
    color: rgb(255, 255, 255);
    background: linear-gradient(45deg, #7e47b9, #2575fc);
    border: 2575fc solid;
    border-radius: 2px;
    opacity: 0.8;
    text-align: center;
    margin-bottom: 20%;
  `;
  return (
    <>
      <Header>Something Wrong...☹</Header>
      <P>Try Again.</P>
    </>
  );
};

export default Loading;
