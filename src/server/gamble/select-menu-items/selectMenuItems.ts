import { pickOneFromArray } from "../../../common/util/pickOneFromArray";
import { filterItemsBelowPrice } from "./item-filters/filterItemsByPrice";
import { filterToPreferredItems } from "./item-filters/filterToPreferredItems";
import { getPriceFromDeliverooObject } from "../../../common/util/getPriceFromDeliverooObject";
import { selectModifiersForItem } from "./selectModifiersForItem";
import {
    ItemDTO,
    ModifierGroupDTO,
    SelectedItemDTO,
} from "../../type/RestaurantDataDTO";

/**
 *  Given a set of menu items and a maximum price, fill a basket
 *  of items that sum to that price
 */
const selectMenuItems = (
    items: ItemDTO[],
    modifiers: ModifierGroupDTO[],
    priceLimit: number,
    options: {
        numberOfPeople: number;
    },
    itemsPicked: number = 0
): SelectedItemDTO[] => {
    // Get all the items that we could pick
    const validItems = filterItemsBelowPrice(items, priceLimit);

    // If we don't have any items to pick then return
    if (validItems.length <= 0) {
        return [];
    }

    // Pick one
    let selectedItem: ItemDTO = pickOneFromArray(validItems);

    // If we have selected fewer items than the number of people, pick a priority item
    if (options.numberOfPeople !== 0 && itemsPicked < options.numberOfPeople) {
        const preferredItems = filterToPreferredItems(validItems);

        if (preferredItems.length > 0) {
            selectedItem = pickOneFromArray(preferredItems);
        }
    }

    // Determine a price limit to pick some modifiers
    const newPriceLimit =
        priceLimit - getPriceFromDeliverooObject(selectedItem).fractional;

    // Get random modifiers for the item (if any exist)
    const selectedModifiers = selectModifiersForItem(
        selectedItem,
        modifiers,
        newPriceLimit
    );

    // Update our new price limit with the price of the modifiers
    const priceOfModifiers = selectedModifiers
        .flatMap((group) => group.options)
        .map((option) => getPriceFromDeliverooObject(option))
        .reduce((a, b) => b.fractional + a, 0);

    const newPriceLimitWithModifiers = newPriceLimit - priceOfModifiers;

    // Filter to list of unselected items
    const unselectedItems = validItems.filter(
        (item) => item.id !== selectedItem.id
    );

    const result = {
        item: selectedItem,
        modifiers: selectedModifiers,
    };

    // Recursively select more items up to the new price limit
    return [
        result,
        ...selectMenuItems(
            unselectedItems,
            modifiers,
            newPriceLimitWithModifiers,
            options,
            itemsPicked + 1
        ),
    ];
};

export { selectMenuItems };
