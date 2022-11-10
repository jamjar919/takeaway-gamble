import React from "react";
import { Pages } from "./page/Pages";
import { GambleContextProvider } from "./context/GambleContext";

import "./App.scss";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GambleContextProvider>
        <Pages />
      </GambleContextProvider>
    </BrowserRouter>
  );
};

export { App };
