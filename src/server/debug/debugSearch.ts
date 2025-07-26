import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import {
    getPlacesToEatContextFromUrl
} from "../gamble/deliveroo/deliveroo-state-retriever/places-to-eat/getPlacesToEatContextFromUrl";

/** Return the parsed list of restaurants */
export const debugSearch = async (_: Request, res: Response) => {
    try {
        const result = await getPlacesToEatContextFromUrl(
            "/restaurants/london/crouch-end?geohash=gcpvmqed3pjq&collection=all-restaurants"
        );
        sendJSON(
            result,
            res
        );

    } catch (e: any) {
        console.log("Error debug", e);
        sendJSON({ error: e?.message || "Error" }, res);
    }
};