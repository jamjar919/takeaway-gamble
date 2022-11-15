import { Restaurant } from "../../../../type/Restaurant";
import { pickOneFromArray } from "../../../../../common/util/pickOneFromArray";
import { getDeliverooRestaurantContextFromUrl } from "../../deliveroo-state-retriever/restaurant/getDeliverooRestaurantContextFromUrl";
import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";

const MAX_RESTAURANTS = 9;

const getOpenPlaceFromState = async (
    placesToEat: Restaurant[],
    attempt = 0
): Promise<RestaurantDataDTO> => {
    if (attempt > MAX_RESTAURANTS) {
        throw new Error("Polled too many places");
    }

    // Select one randomly
    const { url } = pickOneFromArray(placesToEat);

    // Fetch + get context for it
    const restaurantContext = await getDeliverooRestaurantContextFromUrl(url);

    // Get another one if we cannot order from this one
    if (!restaurantContext.isAvailable) {
        console.info(restaurantContext.name, "not available");

        return await getOpenPlaceFromState(placesToEat, attempt + 1);
    }

    return restaurantContext;
};

export { getOpenPlaceFromState };
