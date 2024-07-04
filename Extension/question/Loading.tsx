import styled from "styled-components";

const Loading = () => {
  const Header = styled.h4`
    color: #fff;
    text-align: center;
    margin-top: 22%;
  `;
  const P = styled.p`
    padding: 4px;
    color: rgb(255, 255, 255);
    background: linear-gradient(45deg, #7e47b9, #2575fc);
    border: 2575fc solid;
    border-radius: 2px;
    opacity: 0.8;
    text-align: center;
    margin-bottom: 30%;
  `;
  return (
    <>
      <Header>Loading...🤔</Header>
      <P>
        Please wait. This may take a few moments. Thank you for your patience.
      </P>
    </>
  );
};

export default Loading;
