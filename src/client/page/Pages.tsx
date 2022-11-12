import React from "react";
import { GambleResultPage } from "./gamble-result/GambleResultPage";
import { SearchPage } from "./search/SearchPage";
import { Route, Routes } from "react-router-dom";
import { Endpoints } from "../../common/Endpoints";
import { useTitle } from "../framework/useTitle";

const Pages: React.FC = () => {
    useTitle();

    return (
        <Routes>
            <Route path={Endpoints.SEARCH} element={<SearchPage />} />
            <Route path={Endpoints.RESULT} element={<GambleResultPage />} />
        </Routes>
    );
};

export { Pages };
