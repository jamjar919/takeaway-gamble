import {getPlacesToEat, validatePlaceToEatUrl} from "./getPlacesToEat";
import {getDeliverooContextFromUrl} from "./getDeliverooContextFromUrl";
import {getMenuItems} from "./getMenuItems";
import {selectMenuItems} from "./selectMenuItems";
import {GambleErrorResponse, SuccessfulGambleResponse} from "../../common/type/GambleResponse";
import {getModifierGroups} from "./getModifierGroups";
import {getOpenPlaceFromState} from "./getOpenRestaurant";
import {getPlacesToEatUrl} from "./get-places-to-eat-url/getPlacesToEatUrl";
import {Restaurant} from "../type/Restaurant";
import {DeliverooMenuPageState, DeliverooState} from "../type/deliveroo/DeliverooState";
import {getPlaceToEatMeta} from "./getPlaceToEatMeta";

type GambleRequest = {
    postcode: string,
    priceLimit?: number;
    firstItemIsLarge?: boolean;
    restaurantId?: string;
}

const GAMBLE_MAX = 1000_00;

const gamble = async (
    address: string,
    priceLimit: number,
    options: {
        firstItemIsLarge: boolean,
        restaurantUrl: string | null
    }
): Promise<SuccessfulGambleResponse | GambleErrorResponse> => {
    try {
        if (priceLimit > GAMBLE_MAX) {
            return {
                type: "error",
                error: "Max price is £1000"
            };
        }

        let restaurantData: {
            selectedPlace: Restaurant,
            restaurantContext: DeliverooState,
            selectedPlaceMeta: DeliverooMenuPageState["menu"]["meta"]
        };

        // If no restaurant id supplied, pick one based on geolocation
        if (options.restaurantUrl === null) {

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

            // Get all the places to eat from the search page
            const placesToEat = getPlacesToEat(searchPageContext);

            // Select one that's open
            restaurantData = await getOpenPlaceFromState(
                placesToEat
            );
        } else {
            const isValidUrl = validatePlaceToEatUrl(options.restaurantUrl)

            if (!isValidUrl) {
                return {
                    type: "error",
                    error: ""
                }
            }

            // Fetch + get context for it
            const restaurantContext = await getDeliverooContextFromUrl(options.restaurantUrl);

            // Retrieve more detailed information
            const selectedPlaceMeta = getPlaceToEatMeta(
                restaurantContext
            )

             restaurantData = {
                selectedPlace: {
                    name: selectedPlaceMeta.restaurant.name,
                    url: options.restaurantUrl
                },
                restaurantContext,
                selectedPlaceMeta
            }
        }

        // Get items
        const items = getMenuItems(restaurantData.restaurantContext);
        const modifierGroups = getModifierGroups(restaurantData.restaurantContext);

        // Select some random items + modifiers
        const selectedItems = selectMenuItems(
            items,
            modifierGroups,
            priceLimit,
            options
        );

        console.log(
            `Generated ${selectedItems.length} items for ${restaurantData.selectedPlace.name} with limit ${priceLimit}`
        );

        return {
            type: "success",
            selected: {
                restaurant: restaurantData.selectedPlaceMeta,
                items: selectedItems,
                url: restaurantData.selectedPlace.url
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