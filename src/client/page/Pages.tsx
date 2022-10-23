import React from "react";
import {GambleResultPage} from "./gamble-result/GambleResultPage";
import {SearchPage} from "./search/SearchPage";
import {Route, Routes} from "react-router-dom";

const Pages: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<SearchPage/>}
            />
            <Route
                path="/result"
                element={<GambleResultPage />}
            />
        </Routes>
    )
}

export { Pages }