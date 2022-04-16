// Convert the deliveroo state to a list of restaurants
import {DeliverooState} from "../type/deliveroo/DeliverooState";
import {Restaurant} from "../type/Restaurant";

const getPlacesToEat = (state: DeliverooState): Restaurant[] => {
    if (!state?.props?.initialState?.home?.feed?.results?.data?.length) {
        console.error("Could not find any restaurants in state");
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

            console.log(target);

            return false;
        })
        .map((uiTargetRestaurant) => uiTargetRestaurant.restaurant)
        .map((deliverooRestaurant) => ({
            name: deliverooRestaurant.name,
            url: deliverooRestaurant.links.self.href
        }))
};

export { getPlacesToEat }