import React from "react";
import {SearchPage} from "./page/search/SearchPage";
import {AppContextProvider} from "./context/AppContext";

const App: React.FC = () => {
    return (
        <AppContextProvider>
            <SearchPage />
        </AppContextProvider>
    )
}

export { App };