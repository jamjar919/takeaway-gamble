import { getPriceFromDeliverooObject } from "../../../../common/util/getPriceFromDeliverooObject";
import { filterItemsAbovePrice } from "./filterItemsByPrice";
import { ItemDTO } from "../../../type/RestaurantDataDTO";

/** Apply a heuristic to filter to preferred items */
const filterToPreferredItems = (items: ItemDTO[]): ItemDTO[] => {
    // Prefer selecting items above 2/3 of the price
    const itemsSortedByPrice = items.sort(
        (a, b) => a.price.fractional - b.price.fractional
    );

    const priceLimitItem =
        itemsSortedByPrice[Math.floor((items.length * 2) / 3)];

    const priceLimit = getPriceFromDeliverooObject(priceLimitItem).fractional;

    return filterItemsAbovePrice(items, priceLimit);
};

export { filterToPreferredItems };
