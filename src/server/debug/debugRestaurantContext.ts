import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import { validatePlaceToEatUrl } from "../gamble/deliveroo/get-restaurant-data/url/deliverooMenuUrlCache";
import { getDeliverooRestaurantContextFromUrl } from "../gamble/deliveroo/deliveroo-state-retriever/restaurant/getDeliverooRestaurantContextFromUrl";
import { getDeliverooContextFromUrl } from "../gamble/deliveroo/deliveroo-state-retriever/getDeliverooContextFromUrl";

export const debugRestaurantContext = async (req: Request, res: Response) => {
    try {
        const url = req.query["url"];
        const wantsContext = typeof req.query["context"] !== "undefined";

        if (typeof url !== "string") {
            sendJSON({ error: "Pass in a URL as a param" }, res);
            return;
        }

        if (!validatePlaceToEatUrl(url as string)) {
            sendJSON({ error: "URL not valid" }, res);
            return;
        }

        if (wantsContext) {
            const result = await getDeliverooContextFromUrl(url as string)
            sendJSON(
                result,
                res
            );
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
