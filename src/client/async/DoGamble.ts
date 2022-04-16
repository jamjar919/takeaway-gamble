import {Endpoints} from "../../common/Endpoints";

const doGamble = (): Promise<string> => {
    return fetch(Endpoints.GAMBLE, {
        method: "POST"
    }).then(result => result.text())
}

export { doGamble }