import { getPlaceToEatMetaFromDeliverooState } from "../../deliveroo-state-selector/getPlaceToEatMetaFromDeliverooState";
import { RestaurantDataBundle } from "../../../../type/RestaurantDataBundle";
import {
  normaliseUrlPath,
  validatePlaceToEatUrl,
} from "./deliverooMenuUrlCache";
import {getDeliverooRestaurantContextFromUrl} from "../../deliveroo-state-retriever/getDeliverooRestaurantContextFromUrl";

const getRestaurantDataFromUrl = async (
  unsafeUrl: string,
): Promise<RestaurantDataBundle> => {
  const normalisedUrl = normaliseUrlPath(unsafeUrl);

  // Verify URL is valid + safe to go to
  const isValidUrl = validatePlaceToEatUrl(normalisedUrl);

  if (!isValidUrl) {
    throw new Error("Unrecognised URL");
  }

  // Fetch + get context for it
  const restaurantContext = await getDeliverooRestaurantContextFromUrl(normalisedUrl);

  // Retrieve more detailed information
  const selectedPlaceMeta =
    getPlaceToEatMetaFromDeliverooState(restaurantContext);

  return {
    selectedPlace: {
      name: selectedPlaceMeta.restaurant.name,
      url: normalisedUrl,
    },
    restaurantContext,
    selectedPlaceMeta,
  };
};

export { getRestaurantDataFromUrl };
