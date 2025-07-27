import { getDeliverooContextFromUrl } from "../getDeliverooContextFromUrl";
import { getPlacesToEatFromDeliverooState } from "../../deliveroo-state-selector/getPlacesToEatFromDeliverooState";
import { Restaurant } from "../../../../type/Restaurant";

/**
 * Retrieve a shallow list of restaurants/urls
 */
const getPlacesToEatContextFromUrl = async (
    searchPageUrl: string,
    maxDeliveryMinutes: number
): Promise<Restaurant[]> => {
    // Obtain restaurants in the area
    const searchPageContext = await getDeliverooContextFromUrl(searchPageUrl);

    // Get all the places to eat from the search page
    return getPlacesToEatFromDeliverooState(searchPageContext, maxDeliveryMinutes);
};

export { getPlacesToEatContextFromUrl };
