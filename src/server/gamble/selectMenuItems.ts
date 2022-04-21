
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

const filterItemsAbovePrice = (
    items: DeliverooItem[],
    priceLimit: number
): DeliverooItem[] => {
    return items
        .filter((item) => item.price.fractional > priceLimit)
}

/** Apply a heuristic to filter to preferred items */
const filterToPreferredItems = (
    items: DeliverooItem[],
) => {

    // Prefer selecting items above 2/3 of the price
    const itemsSortedByPrice = items.sort((a, b) => a.price.fractional - b.price.fractional);

    const priceLimitItem = itemsSortedByPrice[Math.floor(items.length * 3/4)];

    const priceLimit = priceLimitItem?.priceDiscounted?.fractional ?? priceLimitItem.price.fractional;

    console.log("Median price: ", priceLimit);

    return filterItemsAbovePrice(items, priceLimit);
}

/**
 *  Given a set of menu items and a maximum price, fill a basket
 *  of items that sum to that price
 */
const selectMenuItems = (
    items: DeliverooItem[],
    priceLimit: number,
    options: {
        firstItemIsLarge: boolean
    },
    itemsPicked: number = 0,
): DeliverooItem[] => {
    // Get all the items that we could pick
    const validItems = filterItemsBelowPrice(items, priceLimit);

    // If we don't have any items to pick then return
    if (validItems.length <= 0) {
        return []
    }

    // Pick one
    let picked = pickOneFromArray(validItems);

    // If this is the first item then pick a priority item
    if (itemsPicked === 0 && options.firstItemIsLarge) {
        const preferredItems = filterToPreferredItems(validItems);

        if (preferredItems.length > 0) {
            picked = pickOneFromArray(preferredItems)
        }
    }

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
        ...selectMenuItems(unselectedItems, newPriceLimit, options, itemsPicked + 1)
    ]

};

export { selectMenuItems }