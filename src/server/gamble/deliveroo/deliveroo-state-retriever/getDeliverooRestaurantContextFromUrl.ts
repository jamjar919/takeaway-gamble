import { getDeliverooContextFromUrl } from "./getDeliverooContextFromUrl";
import { getMenuItemsFromDeliverooState } from "../deliveroo-state-selector/getMenuItemsFromDeliverooState";
import { getMenuPageCategories } from "../deliveroo-state-selector/getMenuPageCategories";
import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { mergeDeliverooStatesFromCategories } from "./mergeDeliverooStatesFromCategories";

const getDeliverooRestaurantContextFromUrl = async (
    url: string,
    allowFetchingCategories = true
) => {
    const state = await getDeliverooContextFromUrl(url);

    // Assert the context we got has items in it
    if (getMenuItemsFromDeliverooState(state).length > 0) {
        return state;
    }

    if (!allowFetchingCategories) {
        throw new Error("No items in state");
    }

    // Ok, no items. Cool cool. It's probably a category page.
    const categories = getMenuPageCategories(state);

    if (categories.length < 1) {
        throw new Error("Weird state, no items or categories");
    }

    const deliverooStates: DeliverooState[] = await Promise.all(
        categories.map((category) => {
            const urlWithCategory = `${url}?category_id=${category.id}`;

            return getDeliverooRestaurantContextFromUrl(urlWithCategory, false);
        })
    );

    return mergeDeliverooStatesFromCategories(
        state,
        deliverooStates,
        categories
    );
};

export { getDeliverooRestaurantContextFromUrl };
