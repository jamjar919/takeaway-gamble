import {Endpoints} from "../../common/Endpoints";
import {GambleResponse} from "../../common/type/GambleResponse";

const doGamble = (
    priceLimit: number,
    firstItemIsLarge: boolean
): Promise<GambleResponse> => {
    return fetch(Endpoints.GAMBLE, {
        method: "POST",
        body: JSON.stringify({ priceLimit, firstItemIsLarge }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
}

export { doGamble }