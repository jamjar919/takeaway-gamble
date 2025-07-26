import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { Restaurant } from "../../../type/Restaurant";
import { addUrlToCache } from "../get-restaurant-data/url/deliverooMenuUrlCache";
import { UIRooBlock } from "../../../type/deliveroo/DeliverooUI";

const SOFT_MAX_DELIVERY_TIME_MINUTES = 30;

// Convert the deliveroo state to a list of restaurants
const getPlacesToEatFromDeliverooState = (
    state: DeliverooState
): Restaurant[] => {
    if (!state?.props?.initialState?.home?.feed?.results?.data?.length) {
        console.error("Could not find any restaurants in state");
        console.error(state?.props?.initialState);
        throw new Error("Could not find any restaurants");
    }

    const { data } = state.props.initialState.home.feed.results;

    const rooBlocks =  data
        .flatMap((uiLayoutList) => uiLayoutList.blocks) // get tha blocks
        .filter((maybeRooBlock: UIRooBlock): maybeRooBlock is UIRooBlock => {
            if (typeof maybeRooBlock === "undefined") {
                return false;
            }

            // filter to just UIRooBlock
            if (maybeRooBlock.typeName === "UIRooBlock") {
                return true;
            }

            // log here as we don't expect any other cards
            console.log(maybeRooBlock?.typeName, "is not a UIRooBlock");

            return false;
        });

    // Attempt to filter to restaurants that are within some set delivery time
    // This helps because Deliveroo often returns thousands of restaurants if you're in a big city
    const rooBlocksNearYou = rooBlocks
        .filter((rooBlock: UIRooBlock) => {
            const estimatedDeliveryTime = Number(
                rooBlock.data["estimated-delivery-bubble-type-default-partner-delivery-time.content"]
            );

            // NaN generally means the restaurant is closed or not delivering
            if (isNaN(estimatedDeliveryTime)) {
                return false;
            }

            return estimatedDeliveryTime <= SOFT_MAX_DELIVERY_TIME_MINUTES;
        });

    if (rooBlocksNearYou.length === 0) {
        console.warn("No restaurants found within the soft max delivery time");
        return rooBlocks.map(mapRooBlockToRestaurant);
    }

    return rooBlocksNearYou.map(mapRooBlockToRestaurant)
};

const mapRooBlockToRestaurant = (rooBlock: UIRooBlock): Restaurant => {
    const name = rooBlock.data["partner-card.on-tap"].action.parameters.restaurant_name;
    const url = rooBlock.data["partner-card.on-tap"].action.parameters.restaurant_href;

    addUrlToCache(url);

    return {
        name,
        url
    }
}

export { getPlacesToEatFromDeliverooState };
