import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEat} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {pickOneFromArray} from "../util/pickOneFromArray";

export const gamble = async (_: Request, res: Response) => {

    // Obtain restaurants in the area
    const searchPageContext = await getDeliverooContextFromUrl(
        "/restaurants/oxford/littlemore-blackbird-leys?collection=all-restaurants",
    );
    const placesToEat = getPlacesToEat(searchPageContext);

    // Select one randomly
    const randomPlace = pickOneFromArray(placesToEat);

    // Fetch + get context for it
    const restaurantContext = await getDeliverooContextFromUrl(
        randomPlace.url,
    );

    sendJSON(restaurantContext, res);
};