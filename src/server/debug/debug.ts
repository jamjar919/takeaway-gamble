import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";

export const debug = async (_: Request, res: Response) => {
     sendJSON({
         urls: [
             "/api/debug/gamble",
             "/api/debug/restaurant?url=/menu/Oxford/dean-court-and-cumnor/oxford-drinks-and-snacks-delivery",
            "/api/debug/restaurant?url=/menu/Oxford/dean-court-and-cumnor/oxford-drinks-and-snacks-delivery&context=true"
         ]
     }, res);
};
