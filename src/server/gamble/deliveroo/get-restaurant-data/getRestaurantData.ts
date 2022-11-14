import {
    GambleMethod,
    GambleRequest,
} from "../../../../common/type/GambleRequest";
import { RestaurantDataDTO } from "../../../type/RestaurantDataDTO";
import { getRestaurantDataFromPostcode } from "./postcode/getRestaurantDataFromPostcode";
import { getRestaurantDataFromUrl } from "./url/getRestaurantDataFromUrl";

const getRestaurantData = async (
    request: GambleRequest
): Promise<RestaurantDataDTO> => {
    switch (request.method) {
        case GambleMethod.POSTCODE:
            return await getRestaurantDataFromPostcode(request.postcode);
        case GambleMethod.URL:
            return await getRestaurantDataFromUrl(request.url);
        default:
            throw new Error("Unsupported gamble method");
    }
};

export { getRestaurantData };
