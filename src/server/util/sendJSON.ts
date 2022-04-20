import {Response} from "express";

const sendJSON = <T extends {}>(data: T, res: Response<T>) => {
    if (data.hasOwnProperty("error")) {
        res.status(500);
    }
    res.send(data);
};

export { sendJSON };
