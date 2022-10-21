import React from "react";
import {GambleResultPage} from "./gamble-result/GambleResultPage";
import {SearchPage} from "./search/SearchPage";
import {useGambleContext} from "../context/GambleContext";
import {CaptchaPage} from "./captcha/CaptchaPage";

const Pages: React.FC = () => {
    const {
        gamble,
        resetGamble,
        gambleResult
    } = useGambleContext();

    if (gambleResult) {

        if (gambleResult.type === "success") {
            return (
                <GambleResultPage
                    result={gambleResult}
                    resetGamble={() => resetGamble()}
                />
            );
        }

        if (gambleResult.type === "requires_captcha") {
            return (
                <CaptchaPage html={gambleResult.html} />
            )
        }
    }

    return (
        <SearchPage
            onSearch={(postcode, price, firstItemIsLarge) => gamble(postcode, price, firstItemIsLarge)}
            error={gambleResult?.error}
        />
    )
}

export { Pages }