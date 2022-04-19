import React from "react";
import {useAppContext} from "../context/AppContext";
import {GambleResultPage} from "./gamble-result/GambleResultPage";
import {SearchPage} from "./search/SearchPage";

const Pages: React.FC = () => {
    const {
        gamble,
        gambleResult
    } = useAppContext();

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