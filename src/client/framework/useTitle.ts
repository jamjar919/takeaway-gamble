import { useEffect } from "react";
import { useGambleContext } from "../context/GambleContext";
import { GambleResponse } from "../../common/type/GambleResponse";

const getTitle = (gambleResult: null | GambleResponse) => {
    if (gambleResult?.type === "success") {
        return "Takeaway Bet - " + gambleResult.selected.name;
    }

    return "Takeaway Bet";
};

const useTitle = () => {
    const { gambleResult } = useGambleContext();

    useEffect(() => {
        document.title = getTitle(gambleResult);
    }, [gambleResult]);
};

export { useTitle };
