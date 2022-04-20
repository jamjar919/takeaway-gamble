import {Request, Response} from "express";
import {sendJSON} from "../util/sendJSON";
import {getPlacesToEat} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {pickOneFromArray} from "../../common/util/pickOneFromArray";
import {getMenuItems} from "./getMenuItems";
import {selectMenuItems} from "./selectMenuItems";
import {
    GambleErrorResponse,
    GambleResponse,
    RequiresCaptchaResponse,
    SuccessfulGambleResponse
} from "../../common/type/GambleResponse";
import {getPlaceToEatMeta} from "./getPlaceToEatMeta";
import {Restaurant} from "../type/Restaurant";
import {DeliverooMenuPageState, DeliverooState} from "../type/deliveroo/DeliverooState";
import {CaptchaRequiredError} from "./error/CaptchaRequiredError";

type GambleRequest = {
    priceLimit?: number
}

const GAMBLE_MAX = 1000_00;
const MAX_RESTAURANTS = 9;

const getOpenPlaceFromState = async (
    placesToEat: Restaurant[],
    attempt = 0
): Promise<[Restaurant, DeliverooState, DeliverooMenuPageState["menu"]["meta"]]> => {
    if (attempt > MAX_RESTAURANTS) {
        throw new Error("Polled too many places");
    }

    // Select one randomly
    const selectedPlace = pickOneFromArray(placesToEat);

    // Fetch + get context for it
    const restaurantContext = await getDeliverooContextFromUrl(
        selectedPlace.url,
    );

    // Retrieve more detailed information
    const selectedPlaceMeta = getPlaceToEatMeta(
        restaurantContext
    )

    // Get another one if we cannot order from this one
    if (
        selectedPlaceMeta.restaurant.menuDisabled ||
        !selectedPlaceMeta.restaurant.deliversToCustomerLocation
    ) {
        console.info(selectedPlaceMeta.restaurant.name, "not available")

        return await getOpenPlaceFromState(
            placesToEat,
            attempt + 1
        )
    }

    return [
        selectedPlace,
        restaurantContext,
        selectedPlaceMeta
    ]
}

export const gamble = async (req: Request<{}, GambleRequest>, res: Response) => {
    try {

        let priceLimit = 12_00; // £12.00
        if (req.body?.priceLimit) {
            priceLimit = req.body?.priceLimit;
        }

        if (priceLimit > GAMBLE_MAX) {
            sendJSON<GambleErrorResponse>({
                type: "error",
                error: "Max price is £1000"
            }, res);
            return;
        }

        // Obtain restaurants in the area
        const searchPageContext = await getDeliverooContextFromUrl(
            "/restaurants/oxford/littlemore-blackbird-leys?collection=all-restaurants",
        );

        const placesToEat = getPlacesToEat(searchPageContext);

        // Get one that's open
        const [selectedPlace, restaurantContext, selectedPlaceMeta] = await getOpenPlaceFromState(
            placesToEat
        );

        // Get items
        const items = getMenuItems(restaurantContext);

        // Select some random items
        const selectedItems = selectMenuItems(items, priceLimit);

        console.log(
            `Generated ${selectedItems.length} items for ${selectedPlace.name} with limit ${priceLimit}`
        );

        const response: SuccessfulGambleResponse = {
            type: "success",
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

        sendJSON<SuccessfulGambleResponse>(response, res);
    } catch (e: any) {
        if (e instanceof CaptchaRequiredError) {
            sendJSON<RequiresCaptchaResponse>({
                type: "requires_captcha",
                html: e.html()
            }, res);
        }

        console.log("Error gambling ", e);
        sendJSON<GambleErrorResponse>({
            type: "error",
            error: e?.message || 'Error!'
        }, res);
    }
};