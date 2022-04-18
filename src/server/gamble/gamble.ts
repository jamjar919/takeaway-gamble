import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEat} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {pickOneFromArray} from "../../common/util/pickOneFromArray";
import {getMenuItems} from "./getMenuItems";
import {selectMenuItems} from "./selectMenuItems";
import {GambleResponse} from "../../common/type/GambleResponse";
import { DeliverooItem } from "../type/deliveroo/DeliverooItem";
import { Restaurant } from "../type/Restaurant";
import {getPlaceToEat} from "./getPlaceToEat";
import {DeliverooRestaurantFull} from "../type/deliveroo/DeliverooRestaurant";

const createGambleResponse = (
    placesToEat: Restaurant[],
    selectedPlace: DeliverooRestaurantFull & Restaurant,
    items: DeliverooItem[],
    selectedItems: DeliverooItem[]
): GambleResponse => {
    return {
        all: {
            restaurants: placesToEat,
            items
        },
        selected: {
            restaurant: selectedPlace,
            items: selectedItems
        }
    }
}

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

    const fullSelectedPlace = getPlaceToEat(
        restaurantContext
    )

    sendJSON(createGambleResponse(
        placesToEat,
        {
            ...fullSelectedPlace,
            ...selectedPlace
        },
        items,
        selectedItems
    ), res);
};