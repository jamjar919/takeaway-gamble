import {getMenuItemsFromDeliverooState} from "./deliveroo-state-selectors/getMenuItemsFromDeliverooState";
import {selectMenuItems} from "./select-menu-items/selectMenuItems";
import {SuccessfulGambleResponse} from "../../common/type/GambleResponse";
import {getModifierGroupsFromDeliverooState} from "./deliveroo-state-selectors/getModifierGroupsFromDeliverooState";
import {GambleRequest} from "../../common/type/GambleRequest";
import {RestaurantDataBundle} from "../type/RestaurantDataBundle";
import {getRestaurantData} from "./get-restaurant-data/getRestaurantData";
import {normaliseUrlPath} from "./get-restaurant-data/url/deliverooMenuUrlCache";

const gamble = async (
    request: GambleRequest,
): Promise<SuccessfulGambleResponse> => {
    const restaurantData: RestaurantDataBundle = await getRestaurantData(request);

    // Get items
    const items = getMenuItemsFromDeliverooState(restaurantData.restaurantContext);
    const modifierGroups = getModifierGroupsFromDeliverooState(restaurantData.restaurantContext);

    // Select some random items + modifiers
    const selectedItems = selectMenuItems(
        items,
        modifierGroups,
        request.priceLimit,
        {
            firstItemIsLarge: request.firstItemIsLarge ?? false
        }
    );

    console.log(
        `Generated ${selectedItems.length} items for ${restaurantData.selectedPlace.name} with limit ${request.priceLimit}`
    );

    return {
        type: "success",
        selected: {
            restaurant: restaurantData.selectedPlaceMeta,
            items: selectedItems,
            url: normaliseUrlPath(restaurantData.selectedPlace.url)
        }
    };
};

export { gamble }