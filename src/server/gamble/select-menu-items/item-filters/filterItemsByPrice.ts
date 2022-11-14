import { getPriceFromDeliverooObject } from "../../../../common/util/getPriceFromDeliverooObject";
import { ItemDTO } from "../../../type/RestaurantDataDTO";

const filterItemsBelowPrice = (
    items: ItemDTO[],
    priceLimit: number
): ItemDTO[] => {
    return items.filter(
        (item) => getPriceFromDeliverooObject(item).fractional < priceLimit
    );
};

const filterItemsAbovePrice = (
    items: ItemDTO[],
    priceLimit: number
): ItemDTO[] => {
    return items.filter((item) => item.price.fractional > priceLimit);
};

export { filterItemsBelowPrice, filterItemsAbovePrice };
