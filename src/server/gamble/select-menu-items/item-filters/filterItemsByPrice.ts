import { getPriceFromDeliverooObject } from "../../../../common/util/getPriceFromDeliverooObject";
import {Item} from "../../../../common/type/SelectedRestaurantAndItems";

const filterItemsBelowPrice = (
    items: Item[],
    priceLimit: number
): Item[] => {
    return items.filter(
        (item) => getPriceFromDeliverooObject(item).fractional < priceLimit
    );
};

const filterItemsAbovePrice = (
    items: Item[],
    priceLimit: number
): Item[] => {
    return items.filter((item) => item.price.fractional > priceLimit);
};

export { filterItemsBelowPrice, filterItemsAbovePrice };
