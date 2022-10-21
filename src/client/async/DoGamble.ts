import {Endpoints} from "../../common/Endpoints";
import {GambleResponse} from "../../common/type/GambleResponse";
import {LocalStorageKey} from "../framework/localstorage/LocalStorageKey";

const doGamble = (
    postcode: string,
    priceLimit: number,
    firstItemIsLarge: boolean
): Promise<GambleResponse> => {
    localStorage.setItem(LocalStorageKey.POSTCODE, postcode);

    return fetch(Endpoints.GAMBLE, {
        method: "POST",
        body: JSON.stringify({ postcode, priceLimit, firstItemIsLarge }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
}

export { doGamble }