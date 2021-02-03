import React from "react";
import styled from "styled-components";

const Dim: React.FC = ({ children }) => {
  return <StyledDim>{children}</StyledDim>;
};

export default Dim;

const StyledDim = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1;
  flex-direction: column;
`;
