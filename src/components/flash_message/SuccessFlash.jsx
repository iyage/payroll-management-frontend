import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../CloseIcon";
const Container = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: ${(props) => (props.display ? "block" : "none")};
`;
const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #effaf7;
  border: #0a996f solid 1px;
  border-radius: 7px;
  color: #188d18;
  padding: 10px 20px;
  font-size: 12px;
`;
//FFECEE
// FF3A51;
function SuccessFlash({ children, display }) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    setHide(display);
  }, [display]);

  const handleShow = () => {
    console.log("click");
    setHide(false);
  };

  return (
    <Container display={hide}>
      <Wrapper>
        {children}
        <span>
          <CloseIcon onclick={handleShow} />
        </span>
      </Wrapper>
    </Container>
  );
}

export default SuccessFlash;
