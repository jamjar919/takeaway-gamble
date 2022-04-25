import {DeliverooItem} from "../../type/deliveroo/DeliverooItem";
import {getPriceFromDeliverooObject} from "../../../common/util/getPriceFromDeliverooObject";

const filterItemsBelowPrice = (
    items: DeliverooItem[],
    priceLimit: number
): DeliverooItem[] => {
    return items
        .filter((item) =>
            getPriceFromDeliverooObject(item).fractional < priceLimit
        )
}

const filterItemsAbovePrice = (
    items: DeliverooItem[],
    priceLimit: number
): DeliverooItem[] => {
    return items
        .filter((item) => item.price.fractional > priceLimit)
}

export {
    filterItemsBelowPrice,
    filterItemsAbovePrice
}