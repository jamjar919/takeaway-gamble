import { getDeliverooContextFromUrl } from "../getDeliverooContextFromUrl";
import { getMenuItemsFromDeliverooState } from "../../deliveroo-state-selector/getMenuItemsFromDeliverooState";
import { getDeliverooRestaurantContextFromUrlForCategoriesPage } from "./categories/getDeliverooRestaurantContextFromUrlForCategoriesPage";
import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";
import { convertToRestaurantDataDTO } from "../../converter/convertToRestaurantDataDTO";
import { Cache } from "../../../../util/cache";
import { normaliseUrlPath } from "../../get-restaurant-data/url/deliverooMenuUrlCache";

const restaurantCache: Cache<RestaurantDataDTO> = new Cache(
    "RestaurantCache",
    1800000
); // 30min

/**
 * Given a URL for a restaurant, return a DTO containing the items, categories and modifiers.
 * @param url                       Deliveroo URL stub to fetch the state from
 * @param isCategoryRequest         Whether to allow attempting to get categories from the URL
 */
const get = async (
    url: string,
    isCategoryRequest = false
): Promise<RestaurantDataDTO> => {
    const restaurantContext = await getDeliverooContextFromUrl(url);

    console.log(restaurantContext);

    // Assert the context we got has items in it
    if (getMenuItemsFromDeliverooState(restaurantContext).length > 0) {
        // Return the context
        return convertToRestaurantDataDTO(url, restaurantContext);
    }

    if (isCategoryRequest) {
        throw new Error("No items in state");
    }

    // Ok, no items. Cool cool. It's probably a category page. Try that
    return await getDeliverooRestaurantContextFromUrlForCategoriesPage(
        url,
        restaurantContext
    );
};

const getDeliverooRestaurantContextFromUrl = (
    url: string,
    isCategoryRequest = false
) => {
    const cacheKey = normaliseUrlPath(url);

    // If we're fetching categories - then do not use the cache as we would normalise
    // the cached URL to the same as the root URL
    if (restaurantCache.has(cacheKey) && isCategoryRequest) {
        return get(url, isCategoryRequest);
    }

    return restaurantCache.getAsync(cacheKey, () =>
        get(url, isCategoryRequest)
    );
};

export { getDeliverooRestaurantContextFromUrl };
