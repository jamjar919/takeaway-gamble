import express, {Request, Response} from "express";
import dotenv from "dotenv";
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

app.post(Endpoints.GAMBLE, async (req: Request<{}, GambleRequest>, res: Response) => {
    const postcode = req.body.postcode ?? ""

    let priceLimit = 12_00; // £12.00
    if (req.body?.priceLimit) {
        priceLimit = req.body?.priceLimit;
    }

    let firstItemIsLarge = true;
    if (!!req.body?.firstItemIsLarge) {
        firstItemIsLarge = req.body?.firstItemIsLarge;
    }

    const response = await gamble(
        postcode,
        priceLimit,
        { firstItemIsLarge }
    );

    sendJSON<SuccessfulGambleResponse | GambleErrorResponse>(response, res);
})

app.get(Endpoints.DEBUG, debug)

app.listen(port, () => {
    console.log(`Active on port ${port}!`)
});