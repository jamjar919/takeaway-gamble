import React from "react";
import {AppContextProvider} from "./context/AppContext";
import {Pages} from "./page/Pages";

import './App.scss';

const App: React.FC = () => {
    return (
        <AppContextProvider>
            <Pages />
        </AppContextProvider>
    )
}

export { App };