import {getPlacesToEat} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {getMenuItems} from "./getMenuItems";
import {selectMenuItems} from "./selectMenuItems";
import {GambleErrorResponse, SuccessfulGambleResponse} from "../../common/type/GambleResponse";
import {getModifierGroups} from "./getModifierGroups";
import {getOpenPlaceFromState} from "./getOpenRestaurant";
import {getPlacesToEatUrl} from "./get-places-to-eat-url/getPlacesToEatUrl";

type GambleRequest = {
    postcode: string,
    priceLimit?: number;
    firstItemIsLarge?: boolean
}

const GAMBLE_MAX = 1000_00;

const gamble = async (
    address: string,
    priceLimit: number,
    options: {
        firstItemIsLarge: boolean
    }
): Promise<SuccessfulGambleResponse | GambleErrorResponse> => {
    try {
        if (priceLimit > GAMBLE_MAX) {
            return {
                type: "error",
                error: "Max price is £1000"
            };
        }

        // Get deliveroo URL
        const url = await getPlacesToEatUrl(address);

        if (!url) {
            return {
                type: "error",
                error: "Could not find restaurants for your area"
            };
        }

        // Obtain restaurants in the area
        const searchPageContext = await getDeliverooContextFromUrl(url);

        const placesToEat = getPlacesToEat(searchPageContext);

        // Get one that's open
        const [selectedPlace, restaurantContext, selectedPlaceMeta] = await getOpenPlaceFromState(
            placesToEat
        );

        // Get items
        const items = getMenuItems(restaurantContext);
        const modifierGroups = getModifierGroups(restaurantContext);

        // Select some random items + modifiers
        const selectedItems = selectMenuItems(
            items,
            modifierGroups,
            priceLimit,
            options
        );

        console.log(
            `Generated ${selectedItems.length} items for ${selectedPlace.name} with limit ${priceLimit}`
        );

        return {
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
        };

    } catch (e: any) {
        /* On hiatus until i figure out how to make it work

        if (e?.message === "Captcha required") {

            console.log("Sending requires captcha...")

            sendJSON<RequiresCaptchaResponse>({
                type: "requires_captcha",
                html: e?.html
            }, res);

            return;
        }
        */

        console.log("Error gambling ", e);

        return {
            type: "error",
            error: e?.message || 'Error!'
        };
    }
};

export { gamble, GambleRequest }