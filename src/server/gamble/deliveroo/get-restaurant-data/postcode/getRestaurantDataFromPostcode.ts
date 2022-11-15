import { getPlacesToEatUrl } from "./get-places-to-eat-url/getPlacesToEatUrl";
import { getOpenPlaceFromState } from "./getOpenRestaurant";
import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";
import { getPlacesToEatContextFromUrl } from "../../deliveroo-state-retriever/places-to-eat/getPlacesToEatContextFromUrl";

const getRestaurantDataFromPostcode = async (
    postcode: string
): Promise<RestaurantDataDTO> => {
    // Get deliveroo URL
    const url = await getPlacesToEatUrl(postcode);

    if (!url) {
        throw new Error("Could not find restaurants for your area");
    }

    // Get places to eat
    const placesToEat = await getPlacesToEatContextFromUrl(url);

    // Select one that's open
    return await getOpenPlaceFromState(placesToEat);
};

export { getRestaurantDataFromPostcode };
