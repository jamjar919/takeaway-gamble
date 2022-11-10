import { Endpoints } from "../../common/Endpoints";
import { GambleResponse } from "../../common/type/GambleResponse";
import { GambleRequest } from "../../common/type/GambleRequest";

const doGamble = (request: GambleRequest): Promise<GambleResponse> => {
  return fetch(Endpoints.GAMBLE, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result.json());
};

export { doGamble };
