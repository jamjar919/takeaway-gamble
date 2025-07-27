import { getPlacesToEatUrl } from "./get-places-to-eat-url/getPlacesToEatUrl";
import { getOpenPlaceFromState } from "./getOpenRestaurant";
import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";
import { getPlacesToEatContextFromUrl } from "../../deliveroo-state-retriever/places-to-eat/getPlacesToEatContextFromUrl";
import { Cuisine } from "../../../../../common/type/Cuisine";

const getRestaurantDataFromPostcode = async (
    postcode: string,
    cuisine: Cuisine,
    maxDeliveryMinutes: number
): Promise<RestaurantDataDTO> => {
    // Get deliveroo URL
    const url = await getPlacesToEatUrl(postcode, cuisine);

    // Get places to eat
    const placesToEat = await getPlacesToEatContextFromUrl(url, maxDeliveryMinutes);

    // Select one that's open
    return await getOpenPlaceFromState(placesToEat);
};

export { getRestaurantDataFromPostcode };
