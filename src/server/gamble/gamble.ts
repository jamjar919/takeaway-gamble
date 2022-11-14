import { selectMenuItems } from "./select-menu-items/selectMenuItems";
import {GambleResponse, SuccessfulGambleResponse} from "../../common/type/GambleResponse";
import { GambleRequest } from "../../common/type/GambleRequest";
import { RestaurantDataDTO } from "../type/RestaurantDataDTO";
import { getRestaurantData } from "./deliveroo/get-restaurant-data/getRestaurantData";
import { normaliseUrlPath } from "./deliveroo/get-restaurant-data/url/deliverooMenuUrlCache";

const gamble = async (
    request: GambleRequest
): Promise<SuccessfulGambleResponse> => {
    // Get restaurant data based on our request
    const restaurantData: RestaurantDataDTO = await getRestaurantData(
        request
    );

    // Select some random items + modifiers
    const selectedItems = selectMenuItems(
        restaurantData.items,
        restaurantData.modifierGroups,
        request.priceLimit,
        {
            firstItemIsLarge: request.firstItemIsLarge ?? false,
        }
    );

    console.log(
        `Generated ${selectedItems.length} items for ${restaurantData.name} with limit ${request.priceLimit}`
    );

    const response: GambleResponse = {
        type: "success",
        selected: {
            name: restaurantData.name,
            url: normaliseUrlPath(restaurantData.url),
            image: restaurantData.image,
            address: restaurantData.address,
            items: selectedItems,
            categories: restaurantData.categories
        },
    };

    return response;
};

export { gamble };
