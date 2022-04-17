import {DeliverooState} from "../type/deliveroo/DeliverooState";
import {DeliverooRestaurantFull} from "../type/deliveroo/DeliverooRestaurant";

const getPlaceToEat = (state: DeliverooState): DeliverooRestaurantFull => {
    return state.props.initialState.menuPage.menu.meta.restaurant;
}

export { getPlaceToEat };