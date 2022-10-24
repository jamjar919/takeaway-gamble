import {DeliverooState} from "../type/deliveroo/DeliverooState";
import {Restaurant} from "../type/Restaurant";

// Store a list of URL's we've seen
const placesToEatCollection = new Set<string>()

// Compare a given url to see if we've seen it before (and therefore it's safe to visit)
const validatePlaceToEatUrl = (url: string) => {
    return placesToEatCollection.has(normaliseUrlPath(url));
}

// Strip the end of the URL (eg, /menu/oxford/old-headington/moonlight-balti?geohash=gcpnk3m8gxyf => /menu/oxford/old-headington/moonlight-balti)
const normaliseUrlPath = (url: string) => {
    return url.split('?')[0];
}

// Convert the deliveroo state to a list of restaurants
const getPlacesToEat = (state: DeliverooState): Restaurant[] => {
    if (!state?.props?.initialState?.home?.feed?.results?.data?.length) {
        console.error("Could not find any restaurants in state");
        console.error(state?.props?.initialState)
        return [];
    }

    const { data } = state.props.initialState.home.feed.results;

    return data
        .flatMap((uiLayoutList) => uiLayoutList.blocks) // get tha blocks
        .map((uiLayoutCard) => uiLayoutCard.target)
        .filter((target) => { // filter to just UITargetRestaurant
            if (target.typeName === "UITargetRestaurant") {
                return true;
            }

            // log here as we don't expect any other cards
            console.log(target);

            return false;
        })
        .map((uiTargetRestaurant) => uiTargetRestaurant.restaurant)
        .map((deliverooRestaurant) => {
            const url = normaliseUrlPath(deliverooRestaurant.links.self.href);

            placesToEatCollection.add(url);

            return {
                name: deliverooRestaurant.name,
                url
            }
        })
};

export { getPlacesToEat, validatePlaceToEatUrl, normaliseUrlPath }