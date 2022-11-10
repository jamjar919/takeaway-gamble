import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getCachedUrls} from "../gamble/get-restaurant-data/url/deliverooMenuUrlCache";

export const urlCache = async (_: Request, res: Response) => {
    try {
        const urls = Array.from(getCachedUrls())

        sendJSON({
            urls
        }, res);
    } catch (e: any) {
        console.error("Error urlCache", e);
        sendJSON({ error: e?.message || 'Error' }, res);
    }
};