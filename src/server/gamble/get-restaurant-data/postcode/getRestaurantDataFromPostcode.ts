import { getPlacesToEatUrl } from "./get-places-to-eat-url/getPlacesToEatUrl";
import { getDeliverooContextFromUrl } from "../../getDeliverooContextFromUrl";
import { getPlacesToEatFromDeliverooState } from "../../deliveroo-state-selectors/getPlacesToEatFromDeliverooState";
import { getOpenPlaceFromState } from "./getOpenRestaurant";
import { RestaurantDataBundle } from "../../../type/RestaurantDataBundle";

const getRestaurantDataFromPostcode = async (
  postcode: string
): Promise<RestaurantDataBundle> => {
  // Get deliveroo URL
  const url = await getPlacesToEatUrl(postcode);

  if (!url) {
    throw new Error("Could not find restaurants for your area");
  }

  // Obtain restaurants in the area
  const searchPageContext = await getDeliverooContextFromUrl(url);

  // Get all the places to eat from the search page
  const placesToEat = getPlacesToEatFromDeliverooState(searchPageContext);

  // Select one that's open
  return await getOpenPlaceFromState(placesToEat);
};

export { getRestaurantDataFromPostcode };
