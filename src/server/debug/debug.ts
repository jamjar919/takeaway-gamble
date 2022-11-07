import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getCachedUrls} from "../gamble/get-restaurant-data/url/deliverooMenuUrlCache";

export const debug = async (_: Request, res: Response) => {
    try {
        const response = Array.from(getCachedUrls());
        
        sendJSON({
            response
        }, res);
    } catch (e: any) {
        console.error("Error debug", e);
        sendJSON({ error: e?.message || 'Error' }, res);
    }
};