import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEatUrl} from "../gamble/get-places-to-eat-url/getPlacesToEatUrl";

export const debug = async (_: Request, res: Response) => {
    try {
        const response = await getPlacesToEatUrl("OX43RZ");

        console.log(response);

        sendJSON({
            response
        }, res);
    } catch (e: any) {
        console.error("Error debug", e);
        sendJSON({ error: e?.message || 'Error' }, res);
    }
};