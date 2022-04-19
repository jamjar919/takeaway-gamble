import React from "react";
import {Pages} from "./page/Pages";
import {GambleContextProvider} from "./context/GambleContext";

import './App.scss';

const App: React.FC = () => {
    return (
        <GambleContextProvider>
            <Pages />
        </GambleContextProvider>
    )
}

export { App };