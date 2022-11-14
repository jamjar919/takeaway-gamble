import { getMenuItemsFromDeliverooState } from "../deliveroo-state-selector/getMenuItemsFromDeliverooState";
import { getModifierGroupsFromDeliverooState } from "../deliveroo-state-selector/getModifierGroupsFromDeliverooState";
import {
    DeliverooMenuMetaState,
    DeliverooState,
} from "../../../type/deliveroo/DeliverooState";
import { RestaurantDataDTO } from "../../../type/RestaurantDataDTO";
import { convertToItemDTO } from "./convertToItemDTO";
import { convertToModifierGroupDTO } from "./convertToModifierGroupDTO";
import { convertToCategoryDTO } from "./convertToCategoryDTO";

const convertToRestaurantDataDTO = (
    url: string,
    selectedPlaceMeta: DeliverooMenuMetaState,
    restaurantContext: DeliverooState
): RestaurantDataDTO => {
    return {
        name: selectedPlaceMeta.restaurant.name,
        url,
        image: selectedPlaceMeta.metatags.image,
        address: selectedPlaceMeta.restaurant.location.address.address1,
        items: getMenuItemsFromDeliverooState(restaurantContext).map(
            convertToItemDTO
        ),
        modifierGroups: getModifierGroupsFromDeliverooState(
            restaurantContext
        ).map(convertToModifierGroupDTO),
        categories: selectedPlaceMeta.categories.map(convertToCategoryDTO),
    };
};

export { convertToRestaurantDataDTO };
