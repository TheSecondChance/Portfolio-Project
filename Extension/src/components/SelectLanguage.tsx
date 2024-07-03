import styled from "styled-components";

const SelectLanguage = () => {
  const Header = styled.h4`
    color: #fff;
    text-align: center;
    margin-top: 30%;
    // margin-bottom: 50%;
  `;
  const P = styled.p`
    color: #fff;
    text-align: center;
    margin-bottom: 50%;
  `;
  return (
    <>
      <div style={{ width: "20rem", height: "20rem" }}>
        <Header>At least select one language☹</Header>
        <P>To Continue Reopen the extenstion to select</P>
      </div>
    </>
  );
};
export default SelectLanguage;
