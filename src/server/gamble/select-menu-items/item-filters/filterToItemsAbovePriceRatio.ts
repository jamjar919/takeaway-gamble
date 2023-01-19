import { ItemDTO } from "../../../type/RestaurantDataDTO";
import { getPriceFromDeliverooObject } from "../../../../common/util/getPriceFromDeliverooObject";
import { filterItemsAbovePrice } from "./filterItemsByPrice";

/** Filter to items above a median price */
const filterToItemsAbovePriceRatio = (
    items: ItemDTO[],
    ratio: number
): ItemDTO[] => {
    const itemsSortedByPrice = items.sort(
        (a, b) => a.price.fractional - b.price.fractional
    );

    const priceLimitItem = itemsSortedByPrice[Math.floor(items.length * ratio)];

    const priceLimit = getPriceFromDeliverooObject(priceLimitItem).fractional;

    return filterItemsAbovePrice(items, priceLimit);
};

export { filterToItemsAbovePriceRatio };
