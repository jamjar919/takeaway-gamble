import {Response} from "express";

export const sendJSON = (data: any, res: Response) => {
    if (data.error) {
        res.status(500);
    }
    res.send(data);
};