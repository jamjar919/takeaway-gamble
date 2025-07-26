import {
    GambleMethod,
    GambleRequest,
} from "../../../../common/type/GambleRequest";
import { RestaurantDataDTO } from "../../../type/RestaurantDataDTO";
import { getRestaurantDataFromPostcode } from "./postcode/getRestaurantDataFromPostcode";
import { getRestaurantDataFromUrl } from "./url/getRestaurantDataFromUrl";
import { Cuisine } from "../../../../common/type/Cuisine";

const getRestaurantData = async (
    request: GambleRequest
): Promise<RestaurantDataDTO> => {
    switch (request.method) {
        case GambleMethod.POSTCODE:
            const cuisine: Cuisine = request.cuisine ?? Cuisine.any;
            return await getRestaurantDataFromPostcode(
                request.postcode,
                cuisine,
                request.maxDeliveryMinutes ?? 30
            );
        case GambleMethod.URL:
            return await getRestaurantDataFromUrl(request.url);
        default:
            throw new Error("Unsupported gamble method");
    }
};

export { getRestaurantData };
