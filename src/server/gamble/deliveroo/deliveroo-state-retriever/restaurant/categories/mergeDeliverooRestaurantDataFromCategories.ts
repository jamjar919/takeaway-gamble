import { DeliverooCategory } from "../../../../../type/deliveroo/DeliverooCategory";
import { RestaurantDataDTO } from "../../../../../type/RestaurantDataDTO";

/**
 * Merge a list of states from the category item pages into one state. This is an annoying hack that just means we can
 * reuse our converter fn with little hassle.
 */
const mergeDeliverooRestaurantDataFromCategories = (
    categoryStates: RestaurantDataDTO[],
    categories: DeliverooCategory[]
): RestaurantDataDTO => {
    if (categoryStates.length < 1) {
        throw new Error("Cannot merge 0 states");
    }

    const { name, url, image, address, isAvailable } = categoryStates[0];

    // Take the meta information from the first category
    const result: RestaurantDataDTO = {
        items: [],
        modifierGroups: [],
        name,
        url,
        image,
        address,
        categories,
        isAvailable,
    };

    // Merge items and modifier groups
    categoryStates.forEach((data: RestaurantDataDTO) => {
        result.items = [...result.items, ...data.items];
        result.modifierGroups = [
            ...result.modifierGroups,
            ...data.modifierGroups,
        ];
    });

    return result;
};

export { mergeDeliverooRestaurantDataFromCategories };
