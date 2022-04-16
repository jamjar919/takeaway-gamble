import {Request, Response} from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";
import {sendJSON} from "../util/sendJSON";

export const gamble = async (_: Request, res: Response) => {

    const html = await fetch("https://deliveroo.co.uk/restaurants/oxford/littlemore-blackbird-leys?collection=all-restaurants")
        .then(restaurants => restaurants.text());

    const $ = cheerio.load(html);

    // Get the NEXT state
    const deliverooInitialContext = JSON.parse($('#__NEXT_DATA__').html() as string);

    const { meta, results: data } = deliverooInitialContext.props.initialState.home.feed;

    console.log(meta);

    sendJSON(data, res);
};