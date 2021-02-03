import React, { useState } from "react";
import styled from "styled-components";
import { ModalContent, ModalContext } from "./ModalContext";
import Dim from "global/component/atoms/Dim";

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = useState<ModalContent>({ content: null, headerText: null });
  const { content, headerText } = modalContent;

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setModalContent({ content: null, headerText: null });
  };

  return (
    <ModalContext.Provider value={{ modalContent, setModalContent }}>
      {content && (
        <Dim>
          <StyledModalWrapper>
            <div className="header-text-wrapper">
              {headerText}
              <button onClick={closeModal}>&#215;</button>
            </div>
            {content}
          </StyledModalWrapper>
        </Dim>
      )}
      {children}
    </ModalContext.Provider>
  );
};

const StyledModalWrapper = styled.div`
  border-radius: 5px;
  background: #fff;
  min-width: 300px;
  padding: 10px;

  .header-text-wrapper {
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 14px;

    button {
      cursor: pointer;
      font-size: 18px;
      line-height: 14px;
      position: absolute;
      right: 5px;
    }
  }
`;

export default ModalContextProvider;
