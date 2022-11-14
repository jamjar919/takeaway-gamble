import { getPlaceToEatMetaFromDeliverooState } from "../../deliveroo-state-selector/getPlaceToEatMetaFromDeliverooState";
import { RestaurantDataDTO } from "../../../../type/RestaurantDataDTO";
import {
    normaliseUrlPath,
    validatePlaceToEatUrl,
} from "./deliverooMenuUrlCache";
import { getDeliverooRestaurantContextFromUrl } from "../../deliveroo-state-retriever/getDeliverooRestaurantContextFromUrl";
import { convertToRestaurantDataDTO } from "../../converter/convertToRestaurantDataDTO";

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
    const restaurantContext = await getDeliverooRestaurantContextFromUrl(
        normalisedUrl
    );

    // Retrieve more detailed information
    const selectedPlaceMeta =
        getPlaceToEatMetaFromDeliverooState(restaurantContext);

    // Convert to generic objects and return
    return convertToRestaurantDataDTO(
        normalisedUrl,
        selectedPlaceMeta,
        restaurantContext
    );
};

export { getRestaurantDataFromUrl };
