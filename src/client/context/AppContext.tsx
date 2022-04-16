import React, {ReactNode, useMemo, useState} from "react";
import {doGamble} from "../async/DoGamble";
import {GambleResponse} from "../../common/type/GambleResponse";

type AppContext = {
    gamble: (price: number) => Promise<void>,
    resetGamble: () => void,
    gambleResult: null | GambleResponse
}

const defaultValues: AppContext = {
    gamble: () => Promise.reject('Not initialised'),
    resetGamble: () => {},
    gambleResult: null
}

const Context = React.createContext<AppContext>(defaultValues);

const AppContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const { children } = props;

    const [gambleResult, setGambleResult] = useState<null | GambleResponse>(null);

    const gamble = (price: number) =>
        doGamble(price).then((result) => setGambleResult(result));

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

const useAppContext = () => React.useContext(Context);

export { AppContextProvider, useAppContext };
