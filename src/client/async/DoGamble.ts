import {Endpoints} from "../../common/Endpoints";
import {GambleResponse} from "../../common/type/GambleResponse";

const doGamble = (
    priceLimit: number
): Promise<GambleResponse> => {
    return fetch(Endpoints.GAMBLE, {
        method: "POST",
        body: JSON.stringify({ priceLimit })
    }).then(result => result.json())
}

export { doGamble }