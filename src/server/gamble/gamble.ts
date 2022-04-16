import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEat} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {pickOneFromArray} from "../util/pickOneFromArray";
import {getMenuItems} from "./getMenuItems";
import {selectMenuItems} from "./selectMenuItems";
import {GambleResponse} from "../../common/type/GambleResponse";
import { DeliverooItem } from "../type/deliveroo/DeliverooItem";
import { Restaurant } from "../type/Restaurant";

const createGambleResponse = (
    placesToEat: Restaurant[],
    selectedPlace: Restaurant,
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

export const gamble = async (_: Request, res: Response) => {

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
    const selectedItems = selectMenuItems(items, 1500);

    sendJSON(createGambleResponse(
        placesToEat,
        selectedPlace,
        items,
        selectedItems
    ), res);
};