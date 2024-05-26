import { Response } from "express";

const sendJSON = <T extends {}>(data: T, res: Response<T>) => {
    if (data && data.hasOwnProperty("error")) {
        res.status(400);
    }
    res.send(data);
};

export { sendJSON };
