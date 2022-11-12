import { DeliverooItem } from "../../../type/deliveroo/DeliverooItem";
import { getPriceFromDeliverooObject } from "../../../../common/util/getPriceFromDeliverooObject";
import { filterItemsAbovePrice } from "./filterItemsByPrice";

/** Apply a heuristic to filter to preferred items */
const filterToPreferredItems = (items: DeliverooItem[]) => {
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
