import express from "express";
import dotenv from "dotenv";
import {Endpoints} from "../common/Endpoints";
import {gamble} from "./gamble/gamble";
import {debug} from "./debug/debug";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

app.post(Endpoints.GAMBLE, gamble)
app.get(Endpoints.DEBUG, debug)

app.listen(port, () => {
    console.log(`Active on port ${port}!`)
});