import React, { ReactNode, useState } from "react";
import { doGamble } from "../async/DoGamble";
import { GambleResponse } from "../../common/type/GambleResponse";
import { useNavigate } from "react-router-dom";
import { GambleMethod } from "../../common/type/GambleRequest";
import { LocalStorageKey } from "../framework/localstorage/LocalStorageKey";

type GambleContext = {
    postcodeGamble: (
        postcode: string,
        price: number,
        numPeople: number
    ) => Promise<void>;
    urlGamble: (
        url: string,
        price?: number,
        numPeople?: number
    ) => Promise<void>;
    gambleResult: null | GambleResponse;
    gambleInProgress: boolean;
};

const defaultValues: GambleContext = {
    postcodeGamble: () => Promise.reject("Not initialised"),
    urlGamble: () => Promise.reject("Not initialised"),
    gambleResult: null,
    gambleInProgress: false,
};

const Context = React.createContext<GambleContext>(defaultValues);

const GambleContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const { children } = props;

    const navigate = useNavigate();

    const [gambleResult, setGambleResult] = useState<null | GambleResponse>(
        null
    );
    const [gambleInProgress, setGambleInProgress] = useState<boolean>(false);

    const handleGambleResult = (
        response: Promise<GambleResponse>
    ): Promise<void> => {
        setGambleInProgress(true);
        setGambleResult(null);

        return response
            .then((result: GambleResponse) => {
                setGambleResult(result);

                if (result.type === "success") {
                    navigate(result.selected.url);
                }
            })
            .finally(() => {
                setGambleInProgress(false);
            });
    };

    const postcodeGamble = (
        postcode: string,
        priceLimit: number,
        numPeople: number
    ) =>
        handleGambleResult(
            doGamble({
                method: GambleMethod.POSTCODE,
                postcode,
                priceLimit,
                numPeople,
            })
        );

    const urlGamble = (
        url: string,
        priceLimit: number = (Number(
            localStorage.getItem(LocalStorageKey.PRICE_LIMIT)
        ) ?? 12) * 100,
        numPeople: number = 1
    ) =>
        handleGambleResult(
            doGamble({
                method: GambleMethod.URL,
                url,
                priceLimit,
                numPeople,
            })
        );

    const context = {
        postcodeGamble,
        urlGamble,
        gambleResult,
        gambleInProgress,
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useGambleContext = () => React.useContext(Context);

export { GambleContextProvider, useGambleContext };
