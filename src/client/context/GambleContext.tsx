import React, {ReactNode, useState} from "react";
import {doGamble} from "../async/DoGamble";
import {GambleResponse} from "../../common/type/GambleResponse";
import {GAMBLE_REVEAL_TIME_MS} from "../framework/GambleConstants";
import {useNavigate} from "react-router-dom";
import {GambleMethod} from "../../common/type/GambleRequest";

type GambleContext = {
    postcodeGamble: (postcode: string, price: number, firstItemIsLarge: boolean) => Promise<void>,
    urlGamble: (url: string, price: number, firstItemIsLarge: boolean) => Promise<void>,
    gambleResult: null | GambleResponse,
    gambleRevealed: boolean,
    gambleInProgress: boolean
}

const defaultValues: GambleContext = {
    postcodeGamble: () => Promise.reject('Not initialised'),
    urlGamble: () => Promise.reject('Not initialised'),
    gambleResult: null,
    gambleRevealed: false,
    gambleInProgress: false
}

const Context = React.createContext<GambleContext>(defaultValues);

const GambleContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const { children } = props;

    const navigate = useNavigate()

    const [gambleResult, setGambleResult] = useState<null | GambleResponse>(null);
    const [gambleInProgress, setGambleInProgress] = useState<boolean>(false);
    const [gambleRevealed, setGambleRevealed] = useState<boolean>(false);

    const handleGambleResult = (response: Promise<GambleResponse>): Promise<void> => {
        setGambleInProgress(true);

        return response.then((result: GambleResponse) => {
            setGambleResult(result);

            if (result.type === "success") {
                navigate(result.selected.url);
            }
        })
        .then(() => {
            setTimeout(
                () => setGambleRevealed(true),
                GAMBLE_REVEAL_TIME_MS
            )
        })
        .finally(() => {
            setGambleInProgress(false);
        });
    }

    const postcodeGamble = (postcode: string, priceLimit: number, firstItemIsLarge: boolean) =>
        handleGambleResult(doGamble({
            method: GambleMethod.POSTCODE,
            postcode,
            priceLimit,
            firstItemIsLarge
        }));

    const urlGamble = (url: string, priceLimit: number, firstItemIsLarge: boolean) =>
        handleGambleResult(doGamble({
            method: GambleMethod.URL,
            url,
            priceLimit,
            firstItemIsLarge
        }));

    const context = {
        postcodeGamble,
        urlGamble,
        gambleResult,
        gambleRevealed,
        gambleInProgress
    };

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useGambleContext = () => React.useContext(Context);

export { GambleContextProvider, useGambleContext };
