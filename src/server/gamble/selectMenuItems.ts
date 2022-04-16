
import {DeliverooItem} from "../type/deliveroo/DeliverooItem";
import {pickOneFromArray} from "../util/pickOneFromArray";

const filterItemsBelowPrice = (
    items: DeliverooItem[],
    priceLimit: number
): DeliverooItem[] => {
    return items
        .filter((item) =>
            item.price.fractional < priceLimit ||
            (item.priceDiscounted && item.priceDiscounted.fractional < priceLimit)
        )
}

/**
 *  Given a set of menu items and a maximum price, fill a basket
 *  of items that sum to that price
 */
const selectMenuItems = (
    items: DeliverooItem[],
    priceLimit: number
): DeliverooItem[] => {
    // Get all the items that we could pick
    const validItems = filterItemsBelowPrice(items, priceLimit);

    // If we don't have any items to pick then return
    if (validItems.length <= 0) {
        return []
    }

    // Pick one
    const item = pickOneFromArray(validItems);

    // Update our new price limit
    let newPriceLimit = priceLimit - item.price.fractional;
    if (item.priceDiscounted) {
        newPriceLimit = priceLimit - item.priceDiscounted.fractional
    }

    // Recursively select more items up to the new price limit
    return [
        item,
        ...selectMenuItems(validItems, newPriceLimit)
    ]

};

export { selectMenuItems }