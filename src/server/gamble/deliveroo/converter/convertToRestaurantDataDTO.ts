import { getMenuItemsFromDeliverooState } from "../deliveroo-state-selector/getMenuItemsFromDeliverooState";
import { getModifierGroupsFromDeliverooState } from "../deliveroo-state-selector/getModifierGroupsFromDeliverooState";
import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { RestaurantDataDTO } from "../../../type/RestaurantDataDTO";
import { convertToItemDTO } from "./convertToItemDTO";
import { convertToModifierGroupDTO } from "./convertToModifierGroupDTO";
import { convertToCategoryDTO } from "./convertToCategoryDTO";
import { getPlaceToEatMetaFromDeliverooState } from "../deliveroo-state-selector/getPlaceToEatMetaFromDeliverooState";

const convertToRestaurantDataDTO = (
    url: string,
    restaurantContext: DeliverooState
): RestaurantDataDTO => {
    const selectedPlaceMeta =
        getPlaceToEatMetaFromDeliverooState(restaurantContext);

    return Object.freeze({
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
        isAvailable:
            !selectedPlaceMeta.restaurant.menuDisabled &&
            selectedPlaceMeta.restaurant.deliversToCustomerLocation,
    });
};

export { convertToRestaurantDataDTO };
