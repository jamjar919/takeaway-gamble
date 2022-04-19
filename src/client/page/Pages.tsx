import React from "react";
import {useAppContext} from "../context/AppContext";
import {GambleResultPage} from "./gamble-result/GambleResultPage";
import {SearchPage} from "./search/SearchPage";
import {mockGambleResponse} from "../../common/spec/mock/MockGambleResponse";

const Pages: React.FC = () => {
    const {
        gamble,
    } = useAppContext();

    const gambleResult = mockGambleResponse;

    return (
        <div>
            {gambleResult
                ? <GambleResultPage result={gambleResult} />
                : <SearchPage onSearch={(price) => gamble(price)} />
            }
        </div>
    )
}

export { Pages }