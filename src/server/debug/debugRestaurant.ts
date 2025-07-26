import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import {
    validatePlaceToEatUrl
} from "../gamble/deliveroo/get-restaurant-data/url/deliverooMenuUrlCache";
import { getDeliverooRestaurantContextFromUrl } from "../gamble/deliveroo/deliveroo-state-retriever/restaurant/getDeliverooRestaurantContextFromUrl";

/** Return the passed restaurant data for debugging purposes */
export const debugRestaurant = async (req: Request, res: Response) => {
    try {
        const url = req.query["url"];

        if (typeof url !== "string") {
            sendJSON({ error: "Pass in a URL as a param" }, res);
            return;
        }

        if (!validatePlaceToEatUrl(url as string)) {
            sendJSON({ error: "URL not valid, try /menu/London/wood-green/mcdonalds-0021-wood-green" }, res);
            return;
        }

        const result = await getDeliverooRestaurantContextFromUrl(url)
        sendJSON(
            result,
            res
        );

    } catch (e: any) {
        console.log("Error debug", e);
        sendJSON({ error: e?.message || "Error" }, res);
    }
};
