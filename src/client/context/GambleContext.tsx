import React, {ReactNode, useMemo, useState} from "react";
import {doGamble} from "../async/DoGamble";
import {GambleResponse} from "../../common/type/GambleResponse";
import {GAMBLE_REVEAL_TIME_MS} from "../framework/GambleConstants";

type GambleContext = {
    gamble: (postcode: string, price: number, firstItemIsLarge: boolean) => Promise<void>,
    resetGamble: () => void,
    gambleResult: null | GambleResponse,
    gambleRevealed: boolean
}

const defaultValues: GambleContext = {
    gamble: () => Promise.reject('Not initialised'),
    resetGamble: () => {},
    gambleResult: null,
    gambleRevealed: false
}

const Context = React.createContext<GambleContext>(defaultValues);

const GambleContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const { children } = props;

    const [gambleResult, setGambleResult] = useState<null | GambleResponse>(null);
    const [gambleRevealed, setGambleRevealed] = useState<boolean>(false);

    const gamble = (postcode: string, price: number, firstItemIsLarge: boolean) =>
        doGamble(postcode, price, firstItemIsLarge)
            .then((result) => setGambleResult(result))
            .then(() => {
                setTimeout(
                    () => setGambleRevealed(true),
                    GAMBLE_REVEAL_TIME_MS
                )
            });

    const resetGamble = () => {
        setGambleResult(null);
        setGambleRevealed(false);
    };

    const context = useMemo(() => {
        return {
            gamble,
            resetGamble,
            gambleResult,
            gambleRevealed
        }
    }, [gamble, gambleResult, gambleRevealed]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useGambleContext = () => React.useContext(Context);

export { GambleContextProvider, useGambleContext };
