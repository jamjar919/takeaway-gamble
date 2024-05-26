import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";
import {
    normaliseUrlPath,
    validatePlaceToEatUrl,
} from "./deliverooMenuUrlCache";
import { getDeliverooRestaurantContextFromUrl } from "../../deliveroo-state-retriever/restaurant/getDeliverooRestaurantContextFromUrl";
import { addUrlParameter } from "../../../../util/urlParameter";

const getRestaurantDataFromUrl = async (
    unsafeUrl: string,
): Promise<RestaurantDataDTO> => {
    const normalisedUrl = normaliseUrlPath(unsafeUrl);

    // Verify URL is valid + safe to go to
    const isValidUrl = validatePlaceToEatUrl(normalisedUrl);

    if (!isValidUrl) {
        throw new Error("Unrecognised URL");
    }

    // Fetch + get context for it
    // Deliveroo requires the `day=today` param on all requests now
    const urlToUse = addUrlParameter(
        normalisedUrl,
        "day",
        "today"
    );
    return await getDeliverooRestaurantContextFromUrl(urlToUse);
};

export { getRestaurantDataFromUrl };
