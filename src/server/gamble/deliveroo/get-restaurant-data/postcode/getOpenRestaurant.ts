import { Restaurant } from "../../../../type/Restaurant";
import { pickOneFromArray } from "../../../../../common/util/pickOneFromArray";
import { getPlaceToEatMetaFromDeliverooState } from "../../deliveroo-state-selector/getPlaceToEatMetaFromDeliverooState";
import { getDeliverooRestaurantContextFromUrl } from "../../deliveroo-state-retriever/getDeliverooRestaurantContextFromUrl";
import {RestaurantDataBundle} from "../../../../type/RestaurantDataBundle";
import {convertToRestaurantDataBundle} from "../../converter/convertToRestaurantDataBundle";

const MAX_RESTAURANTS = 9;

const getOpenPlaceFromState = async (
    placesToEat: Restaurant[],
    attempt = 0
): Promise<RestaurantDataBundle> => {
    if (attempt > MAX_RESTAURANTS) {
        throw new Error("Polled too many places");
    }

    // Select one randomly
    const selectedPlace = pickOneFromArray(placesToEat);

    // Fetch + get context for it
    const restaurantContext = await getDeliverooRestaurantContextFromUrl(
        selectedPlace.url
    );

    // Retrieve more detailed information
    const selectedPlaceMeta =
        getPlaceToEatMetaFromDeliverooState(restaurantContext);

    // Get another one if we cannot order from this one
    if (
        selectedPlaceMeta.restaurant.menuDisabled ||
        !selectedPlaceMeta.restaurant.deliversToCustomerLocation
    ) {
        console.info(selectedPlaceMeta.restaurant.name, "not available");

        return await getOpenPlaceFromState(placesToEat, attempt + 1);
    }

    return convertToRestaurantDataBundle(
        selectedPlace.url,
        selectedPlaceMeta,
        restaurantContext
    );
};

export { getOpenPlaceFromState };
