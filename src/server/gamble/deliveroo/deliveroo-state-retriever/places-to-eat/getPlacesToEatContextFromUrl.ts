import { getDeliverooContextFromUrl } from "../getDeliverooContextFromUrl";
import { getPlacesToEatFromDeliverooState } from "../../deliveroo-state-selector/getPlacesToEatFromDeliverooState";
import { Restaurant } from "../../../../type/Restaurant";

/**
 * Retrieve a shallow list of restaurants/urls
 * @param searchPageUrl URL to a search page
 */
const getPlacesToEatContextFromUrl = async (
    searchPageUrl: string
): Promise<Restaurant[]> => {
    // Obtain restaurants in the area
    const searchPageContext = await getDeliverooContextFromUrl(searchPageUrl);

    // Get all the places to eat from the search page
    return getPlacesToEatFromDeliverooState(searchPageContext);
};

export { getPlacesToEatContextFromUrl };
