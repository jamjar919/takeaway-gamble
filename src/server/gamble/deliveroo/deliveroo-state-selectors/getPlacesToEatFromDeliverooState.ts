import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { Restaurant } from "../../../type/Restaurant";
import { addUrlToCache } from "../get-restaurant-data/url/deliverooMenuUrlCache";

// Convert the deliveroo state to a list of restaurants
const getPlacesToEatFromDeliverooState = (
  state: DeliverooState
): Restaurant[] => {
  if (!state?.props?.initialState?.home?.feed?.results?.data?.length) {
    console.error("Could not find any restaurants in state");
    console.error(state?.props?.initialState);
    return [];
  }

  const { data } = state.props.initialState.home.feed.results;

  return data
    .flatMap((uiLayoutList) => uiLayoutList.blocks) // get tha blocks
    .map((uiLayoutCard) => uiLayoutCard.target)
    .filter((target) => {
      // filter to just UITargetRestaurant
      if (target.typeName === "UITargetRestaurant") {
        return true;
      }

      // log here as we don't expect any other cards
      console.log(target);

      return false;
    })
    .map((uiTargetRestaurant) => uiTargetRestaurant.restaurant)
    .map((deliverooRestaurant) => {
      const url = deliverooRestaurant.links.self.href;

      addUrlToCache(url);

      return {
        name: deliverooRestaurant.name,
        url,
      };
    });
};

export { getPlacesToEatFromDeliverooState };
