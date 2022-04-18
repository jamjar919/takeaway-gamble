
import {DeliverooItem} from "../type/deliveroo/DeliverooItem";
import {pickOneFromArray} from "../../common/util/pickOneFromArray";

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
    const picked = pickOneFromArray(validItems);

    // Update our new price limit
    let newPriceLimit = priceLimit - picked.price.fractional;
    if (picked.priceDiscounted) {
        newPriceLimit = priceLimit - picked.priceDiscounted.fractional
    }

    // Filter to list of unselected items
    const unselectedItems = validItems
        .filter((item) => item.id !== picked.id)

    // Recursively select more items up to the new price limit
    return [
        picked,
        ...selectMenuItems(unselectedItems, newPriceLimit)
    ]

};

export { selectMenuItems }