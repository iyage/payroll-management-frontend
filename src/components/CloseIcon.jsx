import { BiX } from "react-icons/bi";
import styled from "styled-components";
const Container = styled.div`
  width: 10.2px;
  height: 10.2px;
  cursor: pointer;
`;
function CloseIcon({ onclick }) {
  return (
    <Container onClick={onclick}>
      <BiX />
    </Container>
  );
}

export default CloseIcon;
