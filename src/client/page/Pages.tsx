import React from "react";
import {GambleResultPage} from "./gamble-result/GambleResultPage";
import {SearchPage} from "./search/SearchPage";
import {useGambleContext} from "../context/GambleContext";

const Pages: React.FC = () => {
    const {
        gamble,
        resetGamble,
        gambleResult
    } = useGambleContext();

    return (
        <div>
            {gambleResult
                ? <GambleResultPage
                    result={gambleResult}
                    resetGamble={() => resetGamble()}
                />
                : <SearchPage onSearch={(price) => gamble(price)} />
            }
        </div>
    )
}

export { Pages }