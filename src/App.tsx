import React from "react";
import { ComponentModal } from "./components";
import { BaseToast, BaseAlert } from "./components";
import { refModal } from "./components/Modal/helpers";
import { ContextProvider } from "./context";
import { Routes } from "./routes";
import { alertReference, toastReference } from "./utils";
import './styles.css'

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Routes />
      <ComponentModal ref={refModal} />
      <BaseToast ref={toastReference} />
      <BaseAlert ref={alertReference} />
    </ContextProvider>
  );
};

export default App;
