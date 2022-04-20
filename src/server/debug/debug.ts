import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {pickOneFromArray} from "../../common/util/pickOneFromArray";
import {getPlacesToEat} from "../gamble/getPlacesToEat";
import {getDeliverooContextFromUrl} from "../gamble/getDeliverooContextFromUrl";

export const debug = async (_: Request, res: Response) => {

    try {
        // Obtain restaurants in the area
        const searchPageContext = await getDeliverooContextFromUrl(
            "/restaurants/oxford/littlemore-blackbird-leys?collection=all-restaurants",
        );

        const placesToEat = getPlacesToEat(searchPageContext);

        // Select one randomly
        const selectedPlace = pickOneFromArray(placesToEat);

        // Fetch + get context for it
        const restaurantContext = await getDeliverooContextFromUrl(
            selectedPlace.url,
        );

        sendJSON({
            searchPageContext,
            restaurantContext
        }, res);
    } catch (e: any) {
        console.error("Error debug", e);
        sendJSON({ error: e?.message || 'Error' }, res);
    }
};