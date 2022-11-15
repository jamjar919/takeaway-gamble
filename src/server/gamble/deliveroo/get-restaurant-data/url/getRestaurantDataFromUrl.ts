import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";
import {
    normaliseUrlPath,
    validatePlaceToEatUrl,
} from "./deliverooMenuUrlCache";
import { getDeliverooRestaurantContextFromUrl } from "../../deliveroo-state-retriever/restaurant/getDeliverooRestaurantContextFromUrl";

const getRestaurantDataFromUrl = async (
    unsafeUrl: string
): Promise<RestaurantDataDTO> => {
    const normalisedUrl = normaliseUrlPath(unsafeUrl);

    // Verify URL is valid + safe to go to
    const isValidUrl = validatePlaceToEatUrl(normalisedUrl);

    if (!isValidUrl) {
        throw new Error("Unrecognised URL");
    }

    // Fetch + get context for it
    return await getDeliverooRestaurantContextFromUrl(normalisedUrl);
};

export { getRestaurantDataFromUrl };
