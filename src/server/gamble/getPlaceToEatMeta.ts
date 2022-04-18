import {DeliverooMenuPageState, DeliverooState} from "../type/deliveroo/DeliverooState";

const getPlaceToEatMeta = (state: DeliverooState): DeliverooMenuPageState["menu"]["meta"] => {
    return state.props.initialState.menuPage.menu.meta;
}

export { getPlaceToEatMeta };