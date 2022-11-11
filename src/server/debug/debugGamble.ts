import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import {gamble} from "../gamble/gamble";
import {GambleMethod} from "../../common/type/GambleRequest";

export const debugGamble = async (req: Request, res: Response) => {
    try {
        const response = await gamble({
            priceLimit: 10000,
            method: GambleMethod.URL,
            firstItemIsLarge: true,
            url: req.query["url"] as string
        });

        sendJSON(
            response,
            res
        );
    } catch (e: any) {
        console.error("Error debug", e);
        sendJSON({ error: e?.message || "Error" }, res);
    }
};
