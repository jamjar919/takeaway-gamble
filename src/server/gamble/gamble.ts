import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEat} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {pickOneFromArray} from "../../common/util/pickOneFromArray";
import {getMenuItems} from "./getMenuItems";
import {selectMenuItems} from "./selectMenuItems";
import {GambleResponse} from "../../common/type/GambleResponse";
import {getPlaceToEatMeta} from "./getPlaceToEatMeta";

type GambleRequest = {
    priceLimit?: number
}

const GAMBLE_MAX = 1000_00;

export const gamble = async (req: Request<{}, GambleRequest>, res: Response) => {

    let priceLimit = 12_00; // £12.00
    if (req.body?.priceLimit) {
        priceLimit = req.body?.priceLimit;
    }

    if (priceLimit > GAMBLE_MAX) {
        sendJSON({ error: "Max price is £1000" }, res);
        return;
    }

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

    // Get items
    const items = getMenuItems(restaurantContext);

    // Select some random items
    const selectedItems = selectMenuItems(items, priceLimit);

    // Retrieve more detailed information

    const selectedPlaceMeta = getPlaceToEatMeta(
        restaurantContext
    )

    const response: GambleResponse = {
        all: {
            restaurants: placesToEat,
            items
        },
        selected: {
            restaurant: selectedPlaceMeta,
            items: selectedItems,
            url: selectedPlace.url
        }
    }

    sendJSON(response, res);
};