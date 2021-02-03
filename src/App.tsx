import React from "react";
import GlobalStyle from "global/style/GlobalStyle";
import Layout from "global/layout/Layout";
import ModalContextProvider from "global/context/ModalContextProvider";
import Spinner from "global/component/atoms/Spinner";
import Alert from "global/component/atoms/Alert";
import { useSelector } from "react-redux";
import { selectSpinner, selectAlert } from "global/selector";

const App: React.FC = () => {
  const spinner = useSelector(selectSpinner);
  const { isOpen } = useSelector(selectAlert);

  return (
    <>
      <ModalContextProvider>
        <GlobalStyle />
        <Layout />
        {spinner && <Spinner />}
        {isOpen && <Alert />}
      </ModalContextProvider>
    </>
  );
};

export default App;
