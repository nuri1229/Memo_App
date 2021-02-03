import React from "react";

export type ModalContent = {
  content: JSX.Element | null;
  headerText: string | null;
};

type ModalContextType = {
  modalContent: ModalContent;
  setModalContent: null | ((modalContent: ModalContent) => void);
};

const defaultValue: ModalContextType = {
  modalContent: {
    content: null,
    headerText: null,
  },
  setModalContent: null,
};

export const ModalContext = React.createContext(defaultValue);
