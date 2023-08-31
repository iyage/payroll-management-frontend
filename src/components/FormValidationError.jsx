import React from "react";
import styled from "styled-components";

const Paragragph = styled.p`
  color: red;
  font-size: 12px;
`;

function FormValidationError({ text }) {
  return <Paragragph>{text}</Paragragph>;
}

export default FormValidationError;
