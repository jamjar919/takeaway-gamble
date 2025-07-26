import { sendJSON } from "../util/sendJSON";
import { getDeliverooContextFromUrl } from "../gamble/deliveroo/deliveroo-state-retriever/getDeliverooContextFromUrl";
import { Request, Response } from "express";

/** Return the raw deliveroo state for debugging purposes */
export const debugSearchContext = async (_: Request, res: Response) => {
    try {
        const result = await getDeliverooContextFromUrl(
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
