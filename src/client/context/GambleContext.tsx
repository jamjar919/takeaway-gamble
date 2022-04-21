import React, {ReactNode, useMemo, useState} from "react";
import {doGamble} from "../async/DoGamble";
import {GambleResponse} from "../../common/type/GambleResponse";

type GambleContext = {
    gamble: (price: number, firstItemIsLarge: boolean) => Promise<void>,
    resetGamble: () => void,
    gambleResult: null | GambleResponse
}

const defaultValues: GambleContext = {
    gamble: () => Promise.reject('Not initialised'),
    resetGamble: () => {},
    gambleResult: null
}

const Context = React.createContext<GambleContext>(defaultValues);

const GambleContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const { children } = props;

    const [gambleResult, setGambleResult] = useState<null | GambleResponse>(null);

    const gamble = (price: number, firstItemIsLarge: boolean) =>
        doGamble(price, firstItemIsLarge).then((result) => setGambleResult(result));

    const resetGamble = () => setGambleResult(null);

    const context = useMemo(() => {
        return {
            gamble,
            resetGamble,
            gambleResult
        }
    }, [gamble, gambleResult]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useGambleContext = () => React.useContext(Context);

export { GambleContextProvider, useGambleContext };
