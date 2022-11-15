import {DeliverooState} from "../../../../type/deliveroo/DeliverooState";
import {getMenuPageCategories} from "../../deliveroo-state-selector/getMenuPageCategories";
import {normaliseUrlPath} from "../../get-restaurant-data/url/deliverooMenuUrlCache";
import {mergeDeliverooRestaurantDataFromCategories} from "./mergeDeliverooRestaurantDataFromCategories";
import {getDeliverooRestaurantContextFromUrl} from "../getDeliverooRestaurantContextFromUrl";
import {RestaurantDataDTO} from "../../../../type/RestaurantDataDTO";

/**
 * Retrieve the context from a categories page - for supermarkets and other stuff like that where the main page is a
 * list of categories, rather than a list of items.
 *
 * This is done by making requests to the page url + `?category_id=$CAT`, where we pull the category id's from the main
 * page, and then get all the products from the categories.
 */
const getDeliverooRestaurantContextFromUrlForCategoriesPage = async (
    url: string,
    categoryPageState: DeliverooState
): Promise<RestaurantDataDTO> => {
    const categories = getMenuPageCategories(categoryPageState);

    if (categories.length < 1) {
        throw new Error("No categories found on a presumed categories page");
    }

    // Get states for
    const deliverooRestaurantDataArray: RestaurantDataDTO[] = await Promise.all(
        categories.map((category) => {
            const urlWithCategory =
                `${normaliseUrlPath(url)}?category_id=${category.id}`;

            return getDeliverooRestaurantContextFromUrl(urlWithCategory, false);
        })
    );

    return mergeDeliverooRestaurantDataFromCategories(
        deliverooRestaurantDataArray,
        categories
    );
}

export { getDeliverooRestaurantContextFromUrlForCategoriesPage }