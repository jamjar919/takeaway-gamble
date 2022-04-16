import {Request, Response} from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";
import {sendJSON} from "../util/sendJSON";
import {DeliverooState} from "../type/deliveroo/DeliverooState";
import {getPlacesToEat} from "./getPlacesToEat";

export const gamble = async (_: Request, res: Response) => {

    const html = await fetch("https://deliveroo.co.uk/restaurants/oxford/littlemore-blackbird-leys?collection=all-restaurants")
        .then(restaurants => restaurants.text());

    const $ = cheerio.load(html);

    // Get the NEXT state
    const deliverooInitialContext = JSON.parse($('#__NEXT_DATA__').html() as string) as DeliverooState;

    const result = getPlacesToEat(deliverooInitialContext);

    sendJSON(result, res);
};