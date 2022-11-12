import {
    DeliverooMenuMetaState,
    DeliverooState,
} from "../../../type/deliveroo/DeliverooState";

const getPlaceToEatMetaFromDeliverooState = (
    state: DeliverooState
): DeliverooMenuMetaState => {
    return state.props.initialState.menuPage.menu.meta;
};

export { getPlaceToEatMetaFromDeliverooState };
