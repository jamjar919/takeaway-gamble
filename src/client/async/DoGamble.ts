import {Endpoints} from "../../common/Endpoints";
import {GambleResponse} from "../../common/type/GambleResponse";

const doGamble = (): Promise<GambleResponse> => {
    return fetch(Endpoints.GAMBLE, {
        method: "POST"
    }).then(result => result.json())
}

export { doGamble }