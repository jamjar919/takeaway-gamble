import { ItemDTO } from "../../../type/RestaurantDataDTO";
import { filterToItemsAbovePriceRatio } from "./filterToItemsAbovePriceRatio";
import { filterToFoodItems } from "./filterToFoodItems";

/** Apply a heuristic to filter to preferred items */
const filterToPreferredItems = (items: ItemDTO[]): ItemDTO[] => {
    const foodItems = filterToFoodItems(items);

    return filterToItemsAbovePriceRatio(foodItems, 2/3);
};

export { filterToPreferredItems };
