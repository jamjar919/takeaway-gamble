import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import { gamble } from "../gamble/gamble";
import { GambleMethod } from "../../common/type/GambleRequest";
import { Cuisine } from "../../common/type/Cuisine";

export const debugGamble = async (_: Request, res: Response) => {
    try {
        const response = await gamble({
            priceLimit: 10000,
            method: GambleMethod.POSTCODE,
            numberOfPeople: 0,
            cuisine: Cuisine.chinese,
            postcode: "OX4 3RZ"
        });

        sendJSON(response, res);
    } catch (e: any) {
        console.error("Error debug", e);
        sendJSON({ error: e?.message || "Error" }, res);
    }
};
