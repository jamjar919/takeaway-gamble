import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEatUrl} from "../gamble/get-restaurant-data/postcode/get-places-to-eat-url/getPlacesToEatUrl";
import {getDeliverooContextFromUrl} from "../gamble/getDeliverooContextFromUrl";

export const debug = async (_: Request, res: Response) => {
    try {
        const response = await getPlacesToEatUrl("OX43RZ");

        // Obtain restaurants in the area
        const searchPageContext = await getDeliverooContextFromUrl(response!);

        sendJSON({
            searchPageContext
        }, res);
    } catch (e: any) {
        console.error("Error debug", e);
        sendJSON({ error: e?.message || 'Error' }, res);
    }
};