import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { parse as parsePostcode } from "postcode";

import {Endpoints} from "../common/Endpoints";
import {gamble, GambleRequest} from "./gamble/gamble";
import {debug} from "./debug/debug";
import {sendJSON} from "./util/sendJSON";
import {GambleErrorResponse, SuccessfulGambleResponse} from "../common/type/GambleResponse";

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
app.post(Endpoints.GAMBLE, async (req: Request<{}, GambleRequest>, res: Response) => {
    const postcode = parsePostcode(req.body.postcode ?? "")

    if (!postcode.valid) {
        sendJSON<GambleErrorResponse>({
            type: "error",
            error: "Please enter a valid postcode"
        }, res);
        return;
    }

    let priceLimit = 12_00; // £12.00
    if (req.body?.priceLimit) {
        priceLimit = req.body.priceLimit;
    }

    let firstItemIsLarge = true;
    if (!!req.body?.firstItemIsLarge) {
        firstItemIsLarge = req.body.firstItemIsLarge;
    }

    let restaurantId = null;
    if (req.body?.restaurantId) {
        firstItemIsLarge = req.body.restaurantId;
    }

    const response = await gamble(
        postcode.postcode,
        priceLimit,
        { firstItemIsLarge, restaurantId }
    );

    sendJSON<SuccessfulGambleResponse | GambleErrorResponse>(response, res);
})

app.get(Endpoints.DEBUG, debug)

app.listen(port, () => {
    console.log(`Active on port ${port}!`)
});