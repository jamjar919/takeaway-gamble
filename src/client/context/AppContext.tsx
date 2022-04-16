import React, {ReactNode, useMemo, useState} from "react";
import {doGamble} from "../async/DoGamble";

type AppContext = {
    gamble: () => Promise<void>,
    gambleResult: null | string
}

const defaultValues: AppContext = {
    gamble: () => Promise.reject('Not initialised'),
    gambleResult: null
}

const Context = React.createContext<AppContext>(defaultValues);

const AppContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const { children } = props;

    const [gambleResult, setGambleResult] = useState<null | string>(null);

    const gamble = () =>
        doGamble().then((result) => setGambleResult(result));

    const context = useMemo(() => {
            return {
                gamble,
                gambleResult
            }
    }, [gamble, gambleResult]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useAppContext = () => React.useContext(Context);

export { AppContextProvider, useAppContext };
