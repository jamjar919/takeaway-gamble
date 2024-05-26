import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";

export const debug = async (_: Request, res: Response) => {
     sendJSON({
         urls: [
             "/api/debug/gamble",
             "/api/debug/restaurant?url=/menu/London/wood-green/mcdonalds-0021-wood-green?day=today",
            "/api/debug/restaurant?url=/menu/London/wood-green/mcdonalds-0021-wood-green?day=today&context=true"
         ]
     }, res);
};
