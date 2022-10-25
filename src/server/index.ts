import express, {Request, Response} from "express";
import dotenv from "dotenv";

import {Endpoints} from "../common/Endpoints";
import {gamble} from "./gamble/gamble";
import {debug} from "./debug/debug";
import {sendJSON} from "./util/sendJSON";
import {GambleErrorResponse, SuccessfulGambleResponse} from "../common/type/GambleResponse";
import {GambleRequest} from "../common/type/GambleRequest";
import {validateGambleRequest} from "./gamble/validateGambleRequest";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

// App
app.get(Endpoints.SEARCH, (_, res) => {
    res.sendFile(__dirname + "/client/index.html")
});

app.get(Endpoints.RESULT, (_, res) => {
    res.sendFile(__dirname + "/client/index.html")
});

// API

app.post(Endpoints.GAMBLE, async (req: Request<{}, {}, GambleRequest>, res: Response) => {
    try {
        const request = req.body;

        validateGambleRequest(request)

        const response = await gamble(request);

        sendJSON<SuccessfulGambleResponse>(
            response, res
        );
    } catch (e: any) {
        console.log("Error gambling ", e);

        sendJSON<GambleErrorResponse>(
            {
                type: "error",
                error: e?.message || 'Error!'
            }, res
        );
    }
})

app.get(Endpoints.DEBUG, debug)

app.listen(port, () => {
    console.log(`Active on port ${port}!`)
});